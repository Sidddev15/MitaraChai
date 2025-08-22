'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export type CartItem = {
  id: string; // productId-size (e.g., premium-250g)
  productId: string;
  name: string; // "Premium Leaves (250g)"
  size: '250g' | '500g';
  price: number; // INR
  qty: number;
};

type State = { items: CartItem[] };
type Action =
  | { type: 'ADD'; item: CartItem }
  | { type: 'INC'; id: string }
  | { type: 'DEC'; id: string }
  | { type: 'REMOVE'; id: string }
  | { type: 'LOAD'; state: State }
  | { type: 'CLEAR' };

const CartContext = createContext<{
  items: CartItem[];
  subtotal: number;
  totalQty: number;
  addItem: (item: CartItem) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  openCart: () => void;
} | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      const index = state.items.findIndex((i) => i.id === action.item.id);
      if (index >= 0) {
        const items = [...state.items];
        items[index] = {
          ...items[index],
          qty: items[index].qty + action.item.qty,
        };
        return { items };
      }
      return { items: [...state.items, action.item] };
    }
    case 'INC':
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: i.qty + 1 } : i
        ),
      };
    case 'DEC':
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i
        ),
      };
    case 'REMOVE':
      return { items: state.items.filter((i) => i.id !== action.id) };
    case 'CLEAR':
      return { items: [] };
    case 'LOAD':
      return action.state;
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [open, setOpen] = useState(false);

  // Load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem('mitara_cart');
      if (raw) dispatch({ type: 'LOAD', state: JSON.parse(raw) });
    } catch {}
  }, []);

  // Persist on changes
  useEffect(() => {
    try {
      localStorage.setItem('mitara_cart', JSON.stringify(state));
    } catch {}
  }, [state]);

  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [state.items]
  );
  const totalQty = useMemo(
    () => state.items.reduce((sum, i) => sum + i.qty, 0),
    [state.items]
  );

  const value = {
    items: state.items,
    subtotal,
    totalQty,
    addItem: (item: CartItem) => {
      dispatch({ type: 'ADD', item });
      setOpen(true);
    },
    inc: (id: string) => dispatch({ type: 'INC', id }),
    dec: (id: string) => dispatch({ type: 'DEC', id }),
    remove: (id: string) => dispatch({ type: 'REMOVE', id }),
    clear: () => dispatch({ type: 'CLEAR' }),
    openCart: () => setOpen(true),
  };

  return (
    <CartContext.Provider value={value}>
      {children}

      {/* Drawer UI */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 360, p: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Your Cart
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider sx={{ my: 2 }} />

          {state.items.length === 0 ? (
            <Typography color="text.secondary">Your cart is empty.</Typography>
          ) : (
            <Stack spacing={1}>
              {state.items.map((it) => (
                <Box
                  key={it.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>{it.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      ₹{it.price} × {it.qty}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => value.dec(it.id)}
                    >
                      -
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => value.inc(it.id)}
                    >
                      +
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => value.remove(it.id)}
                    >
                      Remove
                    </Button>
                  </Stack>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Subtotal: ₹{subtotal}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={async () => {
                  try {
                    // build the minimal payload the server expects
                    const items = state.items.map((it) => ({
                      productId: it.productId,
                      size: it.size, // '250g' | '500g'
                      qty: it.qty,
                    }));

                    // create order on our server (which also creates Razorpay order)
                    const res = await fetch('/api/checkout', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ items }),
                    });
                    const data = await res.json();
                    if (!res.ok)
                      throw new Error(data?.error || 'Checkout init failed');

                    // load Razorpay Checkout.js
                    await new Promise<void>((resolve, reject) => {
                      if (typeof window === 'undefined')
                        return reject(new Error('window missing'));
                      if ((window as any).Razorpay) return resolve();
                      const s = document.createElement('script');
                      s.src = 'https://checkout.razorpay.com/v1/checkout.js';
                      s.onload = () => resolve();
                      s.onerror = () =>
                        reject(new Error('Razorpay script failed to load'));
                      document.body.appendChild(s);
                    });

                    const opts: any = {
                      key: data.keyId,
                      amount: data.order.amount, // paise
                      currency: data.order.currency,
                      name: 'Mitàra',
                      description: 'Tea Order',
                      order_id: data.order.id,
                      theme: { color: '#2E5A36' },
                      handler: (resp: any) => {
                        // success → go to thank-you; webhook will mark it PAID
                        value.clear();
                        window.location.href = `/thank-you?order=${encodeURIComponent(
                          data.order.id
                        )}&payment=${encodeURIComponent(resp.razorpay_payment_id)}`;
                      },
                      modal: {
                        ondismiss: () => {
                          // user closed modal; keep cart as-is
                        },
                      },
                      prefill: {
                        // optional: fill from a user profile if you have it
                        name: '',
                        email: '',
                        contact: '',
                      },
                    };

                    // @ts-ignore (global type provided by src/types/razorpay-checkout.d.ts)
                    const rzp = new window.Razorpay(opts);
                    rzp.open();
                  } catch (err: any) {
                    console.error(err);
                    alert(err.message || 'Checkout error');
                  }
                }}
              >
                Pay Now
              </Button>
              <Button
                variant="text"
                color="inherit"
                onClick={() => value.clear()}
              >
                Clear Cart
              </Button>
            </Stack>
          )}
        </Box>
      </Drawer>
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

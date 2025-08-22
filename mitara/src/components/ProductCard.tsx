'use client';
import * as React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
  TextField,
  MenuItem,
} from '@mui/material';
import type { Product } from '@/lib/products';
import { useCart } from '@/store/cart';

export default function ProductCard({ product }: { product: Product }) {
  const [variantIndex, setVariantIndex] = React.useState(0);
  const variant = product.variants[variantIndex];
  const { addItem } = useCart();

  return (
    <Card
      variant="outlined"
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        sx={{ height: 220, objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.tagline}
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mt: 2 }}
          alignItems="center"
        >
          <TextField
            select
            size="small"
            label="Pack"
            value={variantIndex}
            onChange={(e) => setVariantIndex(Number(e.target.value))}
            sx={{ minWidth: 160 }}
          >
            {product.variants.map((v, i) => (
              <MenuItem key={v.size} value={i}>
                {v.size} — ₹{v.price}
              </MenuItem>
            ))}
          </TextField>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ₹{variant.price}
          </Typography>
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() =>
            addItem({
              id: `${product.id}-${variant.size}`,
              productId: product.id,
              name: `${product.name} (${variant.size})`,
              size: variant.size,
              price: variant.price,
              qty: 1,
            })
          }
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

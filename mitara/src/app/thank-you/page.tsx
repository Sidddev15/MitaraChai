'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSearchParams } from 'next/navigation';
import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function ThankYouPage() {
  const sp = useSearchParams();
  const order = sp.get('order');
  const payment = sp.get('payment');

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 1,
            fontFamily: 'var(--font-playfair), serif',
          }}
        >
          Thank you for your order!
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          We’ve received your payment. A confirmation will follow shortly.
        </Typography>

        {order && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2">
              Razorpay Order: <strong>{order}</strong>
            </Typography>
            {payment && (
              <Typography variant="body2">
                Payment ID: <strong>{payment}</strong>
              </Typography>
            )}
          </Box>
        )}

        <Button
          component={Link}
          href="/shop"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Container>
      <Footer />
    </>
  );
}

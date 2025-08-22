'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Container, Typography, Box, Button } from '@mui/material';

export default function HomePage() {
  return (
    <>
      <Header />

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, mb: 2, letterSpacing: '-0.02em' }}
        >
          Mitàra • Home
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Header & Footer are wired. Next we’ll add Hero, About, Products, Cart,
          and Checkout.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained">Primary CTA</Button>
          <Button variant="outlined">Secondary CTA</Button>
        </Box>
      </Container>

      <Footer />
    </>
  );
}

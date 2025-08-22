import * as React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PRODUCTS } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { Container, Grid, Typography } from '@mui/material';

export default function ShopPage() {
  return (
    <>
      <Header />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            letterSpacing: '-0.01em',
            fontFamily: 'var(--font-playfair), serif',
            mb: 4,
          }}
        >
          Shop Mitàra
        </Typography>

        <Grid container spacing={3}>
          {PRODUCTS.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

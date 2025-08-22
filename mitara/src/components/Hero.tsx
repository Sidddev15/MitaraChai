import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: '#FFF8F0',
        borderBottom: '1px solid #eee',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.02em',
                fontFamily: 'var(--font-playfair), serif',
              }}
            >
              Chai that feels like home—crafted by{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                Mitàra
              </Box>
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 520 }}>
              From balanced everyday blends to rich, aroma-forward cups—brew
              your perfect chai.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
              <Button component={Link} href="/shop" variant="contained">
                Explore Blends
              </Button>
              <Button component={Link} href="#about" variant="outlined">
                Our Story
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: 260, md: 380 },
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              }}
            >
              <Image
                src="/images/hero-tea.jpg"
                alt="Mittära Tea"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

import * as React from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  Link as MLink,
} from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: 'background.paper', mt: 8, borderTop: '1px solid #eee' }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontFamily: 'var(--font-playfair), serif',
              }}
            >
              Mitàra
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Chai, done honestly.
            </Typography>
          </Grid>

          <Grid item xs={6} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              Quick Links
            </Typography>
            <MLink
              component={Link}
              href="/"
              color="inherit"
              underline="hover"
              display="block"
            >
              Home
            </MLink>
            <MLink
              component={Link}
              href="/shop"
              color="inherit"
              underline="hover"
              display="block"
            >
              Shop
            </MLink>
            <MLink
              component={Link}
              href="/contact"
              color="inherit"
              underline="hover"
              display="block"
            >
              Contact
            </MLink>
          </Grid>

          <Grid item xs={6} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              Follow
            </Typography>
            <MLink href="#" color="inherit" underline="hover" display="block">
              Instagram
            </MLink>
            <MLink href="#" color="inherit" underline="hover" display="block">
              LinkedIn
            </MLink>
            <MLink href="#" color="inherit" underline="hover" display="block">
              Facebook
            </MLink>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} Mitàra Tea. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

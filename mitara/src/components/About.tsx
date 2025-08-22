import { Box, Container, Grid, Paper, Typography, Stack } from '@mui/material';

export default function About() {
  return (
    <Box
      id="about"
      component="section"
      sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Left: Brand story */}
          <Grid item xs={12} md={7}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.01em',
                fontFamily: 'var(--font-playfair), serif',
              }}
            >
              Why Mitàra?
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 2 }}>
              Mitàra began with a simple belief: <em>chai deserves honesty</em>.
              We source from trusted estates and partner directly with factories
              to deliver fresh, consistent blends. No shortcuts—just dependable
              taste and aroma in every cup.
            </Typography>

            <Stack
              component="ul"
              sx={{ pl: 2, mt: 3, gap: 1, color: 'text.primary' }}
            >
              <li>Transparent sourcing & fresh lots</li>
              <li>Blends tuned for Indian home brewing</li>
              <li>Two convenient packs: 250g & 500g</li>
              <li>Three clear profiles: Premium, Strong, Gold</li>
            </Stack>
          </Grid>

          {/* Right: Promise / metrics */}
          <Grid item xs={12} md={5}>
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                bgcolor: '#F9F8F6',
                borderColor: '#e6e2db',
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Our Promise
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Great tea should be repeatable. We standardize batches so your
                chai tastes the same—today, next week, and next month.
              </Typography>

              <Grid container spacing={2} sx={{ textAlign: 'center', mt: 1 }}>
                <Grid item xs={4}>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    3
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Blends
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    2
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Pack Sizes
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    100%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Fresh Focus
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

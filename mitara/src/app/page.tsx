'use client';

import { Box, Button, Container, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
        Mitàra • Setup OK
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Next.js + Material UI theme is wired. We’ll add the real UI in the next
        commits.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary">
          Primary CTA
        </Button>
        <Button variant="outlined" color="primary">
          Secondary CTA
        </Button>
      </Box>
    </Container>
  );
}

'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { useState } from 'react';

export default function ContactPage() {
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setOk(false);
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Failed to submit');
      setOk(true);
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      setErr(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            letterSpacing: '-0.01em',
            mb: 1,
            fontFamily: 'var(--font-playfair), serif',
          }}
        >
          Let’s talk chai
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Share your details and we’ll get back soon. Wholesale & retail queries
          welcome.
        </Typography>

        <Box component="form" onSubmit={onSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField name="name" label="Name (optional)" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                type="email"
                label="Email"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField name="phone" label="Phone" required fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="message"
                label="Message"
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? 'Sending…' : 'Send'}
              </Button>
            </Grid>
          </Grid>

          {ok && (
            <Alert sx={{ mt: 2 }} severity="success">
              Thanks! We’ll reach out soon.
            </Alert>
          )}
          {err && (
            <Alert sx={{ mt: 2 }} severity="error">
              {err}
            </Alert>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
}

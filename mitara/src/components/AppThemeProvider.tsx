'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/theme';
import { CartProvider } from '@/store/cart';

export default function AppThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}

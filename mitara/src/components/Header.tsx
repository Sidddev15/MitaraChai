'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Badge,
  Button,
  Menu,
  MenuItem,
  useScrollTrigger,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import { useCart } from '@/store/cart';

function HideOnScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();
  return React.cloneElement(children, {
    elevation: trigger ? 2 : 0,
    sx: {
      ...(children.props.sx || {}),
      borderBottom: trigger ? '1px solid #eee' : '1px solid transparent',
    },
  });
}

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { totalQty, openCart } = useCart();

  const handleMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <HideOnScroll>
      <AppBar position="sticky" color="inherit">
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1 }}>
            <Typography
              component={Link}
              href="/"
              variant="h6"
              sx={{
                mr: 2,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                textDecoration: 'none',
                color: 'text.primary',
                fontFamily: 'var(--font-playfair), serif',
              }}
            >
              Mitàra
            </Typography>

            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 3,
                ml: 4,
                alignItems: 'center',
              }}
            >
              <Button component={Link} href="/" color="inherit">
                Home
              </Button>
              <Button component={Link} href="/shop" color="inherit">
                Shop
              </Button>
              <Button component={Link} href="/contact" color="inherit">
                Contact
              </Button>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Cart */}
            <IconButton aria-label="cart" onClick={openCart}>
              <Badge color="primary" badgeContent={totalQty}>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>

            {/* Mobile menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 1 }}>
              <IconButton size="large" aria-label="menu" onClick={handleMenu}>
                <MenuIcon />
              </IconButton>
              <Menu
                id="nav-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem component={Link} href="/" onClick={handleClose}>
                  Home
                </MenuItem>
                <MenuItem component={Link} href="/shop" onClick={handleClose}>
                  Shop
                </MenuItem>
                <MenuItem
                  component={Link}
                  href="/contact"
                  onClick={handleClose}
                >
                  Contact
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}

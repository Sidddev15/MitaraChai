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
  Slide,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';

function HideOnScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();
  // Keep header visible but add shadow on scroll; Slide is optional if you prefer hide-on-scroll behavior.
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

  const handleMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <HideOnScroll>
      <AppBar position="sticky" color="inherit">
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1 }}>
            {/* Logo / Brand */}
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

            {/* Desktop Nav */}
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

            {/* Spacer */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Cart */}
            <IconButton
              aria-label="cart"
              onClick={() => {
                // stub for now; real drawer comes in Commit #5
                if (typeof window !== 'undefined') console.log('Cart clicked');
              }}
            >
              <Badge color="primary" badgeContent={0}>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>

            {/* Mobile menu button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 1 }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls={open ? 'nav-menu' : undefined}
                aria-haspopup="true"
                onClick={handleMenu}
              >
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

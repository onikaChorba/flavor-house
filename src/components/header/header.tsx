import Icons from "../../icons";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { Menu, Close, ShoppingBag } from '@mui/icons-material';
import {
  AppBar, Toolbar, Button, Box, IconButton, Container, Drawer,
  List, ListItem, ListItemButton, ListItemText, Typography
} from "@mui/material";
import { Cart } from "../cart/cart";
import { useCart } from './../../context/CartContext';

const Header = () => {
  const navItems = [
    { name: 'Меню', path: '/menu' },
    { name: 'Акції', path: '/promo' },
    { name: 'Про нас', path: '/about' },
    { name: 'Контакти', path: '/contacts' }
  ];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cartItems } = useCart();
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCartToggle = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <AppBar position="sticky"
      sx={{
        backgroundColor: 'rgba(18, 18, 18, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--borders)',
        boxShadow: 'none',
        zIndex: 1201
      }}>
      <Container maxWidth="lg">
        <Toolbar sx={{
          display: 'flex',
          justifyContent: "space-between",
          padding: '0.5rem 0'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/">
              <img
                src={Icons.logo}
                alt="Logo"
                style={{
                  height: "40px",
                  cursor: 'pointer'
                }} />
            </Link>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex", gap: '2rem' } }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.path}
                sx={{
                  color: 'var(--text-secondary)',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': { color: 'var(--primary)' }
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Button
              variant="contained"
              onClick={handleCartToggle}
              startIcon={<ShoppingBag />}
              sx={{
                backgroundColor: 'var(--primary)',
                textTransform: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                px: 3,
                display: { xs: 'none', md: "flex" },
                '&:hover': { backgroundColor: 'var(--btn-hover)' }
              }}
            >
              {totalItems > 0 ? `Кошик: ${totalPrice.toFixed(2)} ₴` : 'Кошик порожній'}
            </Button>

            <IconButton
              onClick={handleCartToggle}
              sx={{ display: { xs: 'flex', md: 'none' }, color: 'var(--primary)', position: 'relative' }}
            >
              <ShoppingBag />
              {totalItems > 0 && (
                <Box sx={{
                  position: 'absolute', top: 2, right: 2, bgcolor: '#ff4444',
                  color: '#fff', borderRadius: '50%', width: 18, height: 18,
                  fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800
                }}>
                  {totalItems}
                </Box>
              )}
            </IconButton>

            <IconButton onClick={handleDrawerToggle} sx={{ display: { xs: 'flex', md: 'none' }, color: 'var(--accent)' }}>
              <Menu />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        slotProps={{
          paper: {
            sx: {
              width: '280px',
              backgroundColor: 'var(--bg-cards)',
              backgroundImage: 'none',
              color: 'var(--text-primary)',
              padding: '24px',
              borderLeft: '1px solid var(--borders)',
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'var(--text-secondary)' }}>
            <Close />
          </IconButton>
        </Box>

        <List>
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: '8px',
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 122, 24, 0.1)',
                    color: 'var(--primary)'
                  }
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={handleCartToggle}
        slotProps={{
          paper: {
            sx: {
              width: { xs: '100%', sm: '450px' },
              backgroundColor: 'var(--bg)',
              backgroundImage: 'none',
              borderLeft: '1px solid var(--borders)',
              overflowX: 'hidden'
            },
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid var(--borders)' }}>
          <IconButton onClick={handleCartToggle} sx={{ color: 'var(--text-secondary)' }}>
            <Close />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff' }}>Ваше замовлення</Typography>
        </Box>

        <Box sx={{ height: 'calc(100% - 70px)', overflowY: 'auto' }}>
          <Cart />
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
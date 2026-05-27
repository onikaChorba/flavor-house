import Icons from "../../icons";
import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { Menu as MenuIcon, Close, ShoppingBag, PersonOutline, Logout } from '@mui/icons-material';
import {
  AppBar, Toolbar, Button, Box, IconButton, Container, Drawer,
  List, ListItem, ListItemButton, ListItemText, Snackbar, Typography,
  Menu as AccountMenu, MenuItem, Divider, ListItemIcon
} from "@mui/material";
import { Cart } from "../cart/cart";
import { useCart, useAuth } from "../../context";
import { AuthModal } from "../authModal/authModal";

interface LastItemSummary {
  name: string;
  quantity: number;
  price: number;
}

const Header = () => {
  const navItems = [
    { name: 'Меню', path: '/menu' },
    { name: 'Акції', path: '/promo' },
    { name: 'Про нас', path: '/about' },
    { name: 'Контакти', path: '/contacts' }
  ];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isAccountMenuOpen = Boolean(anchorEl);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<LastItemSummary | null>(null);

  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const prevCartItems = useRef<any[]>([]);

  useEffect(() => {
    const addedItem = cartItems.find(item => {
      const prevItem = prevCartItems.current.find(p => p.id === item.id);
      return !prevItem || item.quantity > prevItem.quantity;
    });

    if (addedItem) {
      setLastAddedItem({
        name: addedItem.name,
        quantity: addedItem.quantity,
        price: addedItem.price
      });
      setSnackbarOpen(true);
    }

    prevCartItems.current = cartItems.map(item => ({ ...item }));
  }, [cartItems]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleCartToggle = () => setCartOpen(!cartOpen);

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleAccountMenuClose = () => setAnchorEl(null);

  const handleLogoutClick = async () => {
    try {
      await logout();
      handleAccountMenuClose();
    } catch (err) {
      console.error("Помилка під час виходу:", err);
    }
  };

  const handleSnackbarClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <>
      <AppBar position="sticky"
        sx={{
          backgroundColor: 'rgba(18, 18, 18, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--borders)',
          boxShadow: 'none',
          zIndex: 1201
        }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ display: 'flex', justifyContent: "space-between", padding: '0.5rem 0' }}>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/">
                <img src={Icons.logo} alt="Logo" style={{ height: "40px", cursor: 'pointer' }} />
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

              {user ? (
                <>
                  <Button
                    onClick={handleAccountMenuOpen}
                    startIcon={<PersonOutline sx={{ color: 'var(--primary)' }} />}
                    sx={{
                      color: '#fff',
                      textTransform: 'none',
                      fontWeight: 600,
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      px: 2,
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' }
                    }}
                  >
                    {user.displayName || 'Профіль'}
                  </Button>
                  <AccountMenu
                    anchorEl={anchorEl}
                    open={isAccountMenuOpen}
                    onClose={handleAccountMenuClose}
                    onClick={handleAccountMenuClose}
                    slotProps={{
                      paper: {
                        sx: {
                          backgroundColor: 'var(--bg-cards)',
                          color: '#fff',
                          border: '1px solid var(--borders)',
                          borderRadius: '12px',
                          mt: 1.5,
                          boxShadow: '0px 8px 24px rgba(0,0,0,0.5)',
                        }
                      }
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <Box sx={{ px: 2, py: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {user.displayName || 'Користувач'}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                        {user.email}
                      </Typography>
                    </Box>
                    <Divider sx={{ borderColor: 'var(--borders)' }} />
                    <MenuItem onClick={handleLogoutClick} sx={{ color: '#ff4444', '&:hover': { backgroundColor: 'rgba(255, 68, 68, 0.08)' } }}>
                      <ListItemIcon>
                        <Logout fontSize="small" sx={{ color: '#ff4444' }} />
                      </ListItemIcon>
                      Вийти
                    </MenuItem>
                  </AccountMenu>
                </>
              ) : (
                <Button
                  variant="text"
                  onClick={() => setAuthOpen(true)}
                  startIcon={<PersonOutline />}
                  sx={{
                    color: 'var(--text-primary)',
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '11px',
                    '&:hover': { color: 'var(--primary)', backgroundColor: 'rgba(255,122,24,0.05)' }
                  }}
                >
                  Увійти
                </Button>
              )}

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
                <MenuIcon />
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
          <Box sx={{ height: 'calc(100% - 70px)', overflowY: 'auto', pt: 8 }}>
            <Cart />
          </Box>
        </Drawer>
      </AppBar>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          marginTop: '65px',
          zIndex: 1200
        }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-cards)',
          border: '1px solid var(--primary)',
          borderRadius: '14px',
          p: '12px 20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(255, 122, 24, 0.15)',
          minWidth: '260px',
          maxWidth: '340px',
          backdropFilter: 'blur(10px)'
        }}>
          <Typography variant="caption" sx={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, mb: 0.5 }}>
            Додано в кошик 🍕
          </Typography>

          {lastAddedItem && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
              <Typography
                noWrap
                variant="body2"
                sx={{
                  color: '#fff',
                  fontWeight: 700,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '180px',
                  display: 'block'
                }}
              >
                {lastAddedItem.name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                <Typography variant="caption" sx={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', p: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                  {lastAddedItem.quantity} шт
                </Typography>
                <Typography variant="subtitle2" sx={{ color: 'var(--accent)', fontWeight: 800 }}>
                  {(lastAddedItem.price * lastAddedItem.quantity).toFixed(2)} ₴
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Snackbar>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Header;
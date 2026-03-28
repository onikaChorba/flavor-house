import Icons from "../../icons";
import { useState } from "react";
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from "@mui/icons-material/Close";
import { AppBar, Toolbar, Button, Box, IconButton, Container, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const Header = () => {
  const navItems = [
    { name: 'Меню', path: '/menu' },
    { name: 'Акції', path: '/promo' },
    { name: 'Про нас', path: '/about' },
    { name: 'Контакти', path: '/contacts' }
  ];

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <AppBar position="sticky"
      sx={{
        backgroundColor: 'rgba(18, 18, 18, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--borders)',
        boxShadow: 'none'
      }}>
      <Container maxWidth="lg">
        <Toolbar sx={{
          display: 'flex',
          justifyContent: "space-between",
          padding: '0.rem 0'
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
              component={Link}
              to="/menu"
              sx={{
                backgroundColor: 'var(--primary)',
                display: { xs: 'none', md: "block" },
                '&:hover': { backgroundColor: 'var(--btn-hover)' }
              }}
            >
              Замовити
            </Button>
          </Box>

          <IconButton onClick={handleDrawerToggle} sx={{ display: { xs: 'flex', md: 'none' }, color: 'var(--accent)' }}>
            <MenuIcon />
          </IconButton>
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
            <CloseIcon />
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
          <ListItem disablePadding sx={{ mt: 3 }}>
            <Button
              fullWidth
              variant="contained"
              component={Link}
              to="/menu"
              onClick={handleDrawerToggle}
              sx={{ backgroundColor: 'var(--primary)', py: 1.5 }}
            >
              Замовити
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>);
};

export default Header;
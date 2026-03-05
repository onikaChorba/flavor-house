import Icons from "../../icons";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from "@mui/icons-material/Close";
import { AppBar, Toolbar, Button, Box, IconButton, Container, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";

const Header = () => {
  const navItems = ['Меню', 'Акції', 'Про нас', 'Контакти'];
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
            <img
              src={Icons.logo}
              alt="Logo"
              style={{
                height: "40px",
                cursor: 'pointer'
              }} />
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex", gap: '2rem' } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: 'var(--text-secondary)',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': { color: 'var(--primary)' }
                }}
              >
                {item}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Button variant="contained" sx={{
              backgroundColor: 'var(--primary)',
              display: { xs: 'none', sm: 'none', md: "block" },
              '&:hover': { backgroundColor: 'var(--btn-hover)' }
            }}>Замовити</Button>
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
            <ListItem key={item} disablePadding>
              <ListItemButton
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
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ mt: 3 }}>
            <Button
              fullWidth
              variant="contained"
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
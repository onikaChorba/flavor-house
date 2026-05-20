import { Container, Typography, Box, IconButton, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Telegram, YouTube, LocationOn, Phone } from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'var(--bg-cards)',
        pt: 10,
        pb: 4,
        borderTop: '1px solid var(--borders)',
        color: '#fff'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 6,
          mb: 8
        }}>

          {/* Brand Column */}
          <Box sx={{ flex: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 900, mb: 2, color: 'var(--primary)' }}>
              Flavor House
            </Typography>
            <Typography sx={{ color: 'var(--text-secondary)', maxWidth: '300px', mb: 3 }}>
              Ми створюємо гастрономічні шедеври та доставляємо емоції прямо до ваших дверей. Смак, який неможливо забути.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[
                { icon: <Instagram />, color: '#E1306C' },
                { icon: <Telegram />, color: '#0088cc' },
                { icon: <Facebook />, color: '#1877F2' },
                { icon: <YouTube />, color: '#FF0000' }
              ].map((social, i) => (
                <IconButton
                  key={i}
                  component={motion.button}
                  whileHover={{ y: -5, color: social.color }}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.05)',
                    color: 'rgba(255,255,255,0.6)',
                    transition: '0.3s'
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Box>

          {/* Links Column 1 */}
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 800, mb: 3, textTransform: 'uppercase', letterSpacing: 1 }}>
              Навігація
            </Typography>
            {['Меню', 'Про нас', 'Доставка', 'Контакти', 'Акції'].map((link) => (
              <Typography
                key={link}
                sx={{
                  color: 'var(--text-secondary)',
                  mb: 1.5,
                  cursor: 'pointer',
                  '&:hover': { color: 'var(--primary)' },
                  transition: '0.2s'
                }}
              >
                {link}
              </Typography>
            ))}
          </Box>

          {/* Contacts Column */}
          <Box sx={{ flex: 1.5 }}>
            <Typography sx={{ fontWeight: 800, mb: 3, textTransform: 'uppercase', letterSpacing: 1 }}>
              Контакти
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <LocationOn sx={{ color: 'var(--primary)', fontSize: 20 }} />
              <Typography sx={{ color: 'var(--text-secondary)' }}>м. Київ, вул. Смачна, 12/4</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Phone sx={{ color: 'var(--primary)', fontSize: 20 }} />
              <Typography sx={{ color: 'var(--text-secondary)' }}>+38 (067) 123-45-67</Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                p: 2,
                bgcolor: 'rgba(255,122,24,0.1)',
                borderRadius: '12px',
                color: 'var(--primary)',
                border: '1px dashed var(--primary)',
                textAlign: 'center',
                fontWeight: 700
              }}
            >
              Сьогодні працюємо до 23:00
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'var(--borders)', opacity: 0.5 }} />

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: 4,
          gap: 2
        }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
            © {currentYear} Flavor House. Всі права захищені.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', cursor: 'pointer', '&:hover': { color: '#fff' } }}>
              Політика конфіденційності
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', cursor: 'pointer', '&:hover': { color: '#fff' } }}>
              Договір оферти
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export { Footer };
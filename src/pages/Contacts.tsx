import { Container, Typography, Box, Button, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { PhoneInTalk, LocationOn, AccessTimeFilled, Send, Instagram, Telegram } from '@mui/icons-material';

const Contacts = () => {
  return (
    <Box sx={{ backgroundColor: 'var(--bg)', minHeight: '100vh', py: 10 }}>
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ textAlign: 'center', mb: 10 }}
        >
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 2 }}>
            Ми завжди <span style={{ color: 'var(--primary)' }}>на зв'язку</span>
          </Typography>
          <Typography sx={{ color: 'var(--text-secondary)', maxWidth: '600px', mx: 'auto' }}>
            Маєте запитання, пропозицію або хочете замовити банкет? Оберіть зручний спосіб зв'язку або завітайте до нас у гості.
          </Typography>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: 6
        }}>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[
              {
                icon: <LocationOn />,
                title: 'Наша адреса',
                value: 'м. Київ, вул. Смачна, 12/4',
                sub: 'Центральний вхід, 1 поверх'
              },
              {
                icon: <PhoneInTalk />,
                title: 'Телефони',
                value: '+38 (067) 123-45-67',
                sub: 'Приймаємо дзвінки з 10:00 до 22:00'
              },
              {
                icon: <AccessTimeFilled />,
                title: 'Графік роботи',
                value: 'Пн-Нд: 10:00 — 23:00',
                sub: 'Кухня працює до 22:30'
              }
            ].map((item, i) => (
              <Box
                key={i}
                component={motion.div}
                whileHover={{ x: 10 }}
                sx={{
                  p: 4,
                  bgcolor: 'var(--bg-cards)',
                  borderRadius: '24px',
                  border: '1px solid var(--borders)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3
                }}
              >
                <Box sx={{
                  width: 54, height: 54, borderRadius: '14px',
                  bgcolor: 'rgba(255,122,24,0.1)', color: 'var(--primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {item.icon}
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {item.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                    {item.sub}
                  </Typography>
                </Box>
              </Box>
            ))}

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                fullWidth
                startIcon={<Instagram />}
                sx={{ borderRadius: '15px', py: 1.5, bgcolor: '#E1306C', '&:hover': { bgcolor: '#C13584' } }}
                variant="contained"
              >
                Instagram
              </Button>
              <Button
                fullWidth
                startIcon={<Telegram />}
                sx={{ borderRadius: '15px', py: 1.5, bgcolor: '#0088cc', '&:hover': { bgcolor: '#0077b5' } }}
                variant="contained"
              >
                Telegram
              </Button>
            </Box>
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            sx={{
              flex: 1,
              p: 5,
              bgcolor: 'var(--bg-cards)',
              borderRadius: '32px',
              border: '1px solid var(--borders)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>Напишіть нам</Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[
                { label: "Ваше ім'я", multiline: false, rows: 1 },
                { label: "Email або Телефон", multiline: false, rows: 1 },
                { label: "Ваше повідомлення", multiline: true, rows: 4 },
              ].map((field, index) => (
                <TextField
                  key={index}
                  fullWidth
                  label={field.label}
                  variant="filled"
                  multiline={field.multiline}
                  rows={field.rows}
                  sx={{
                    '& .MuiFilledInput-root': {
                      borderRadius: '12px',
                      bgcolor: 'var(--bg)',
                      color: '#fff',
                      border: '1px solid transparent',
                      transition: '0.2s',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.05)',
                      },
                      '&.Mui-focused': {
                        bgcolor: 'var(--bg)',
                        borderColor: 'var(--primary)',
                        boxShadow: '0 0 10px rgba(255,122,24,0.2)',
                      },
                      '&:before, &:after': {
                        display: 'none',
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255,255,255,0.7)',
                      '&.Mui-focused': {
                        color: 'var(--primary)',
                      }
                    }
                  }}
                />
              ))}

              <Button
                variant="contained"
                endIcon={<Send />}
                sx={{
                  py: 2,
                  mt: 1,
                  borderRadius: '12px',
                  bgcolor: 'var(--primary)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'var(--primary)',
                    filter: 'brightness(1.1)',
                  }
                }}
              >
                Відправити повідомлення
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 10, borderRadius: '32px', overflow: 'hidden', height: '400px', border: '1px solid var(--borders)' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.664431206742!2d30.5190!3d50.4501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDI3JzAwLjAiTiAzMMKwMzEnMDguNCJF!5e0!3m2!1suk!2sua!4v1620000000000!5m2!1suk!2sua"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%)' }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </Box>

      </Container>
    </Box>
  );
};

export { Contacts };
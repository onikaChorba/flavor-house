import { Container, Typography, Box, Button, Paper, Chip, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Delivery from "./../assets/img/delivery.png"
import { LocalOffer, Timer, DeliveryDining, Celebration, ContentCopy } from '@mui/icons-material'

const promotions = [
  {
    id: 1,
    title: 'Перше замовлення -20%',
    description: 'Отримай знижку на своє перше замовлення через наш додаток або сайт.',
    code: 'START20',
    expiry: 'Постійна акція',
    color: 'var(--primary)',
    icon: <Celebration />,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    title: '2+1 на всі Бургери',
    description: 'Купуй два будь-яких бургери та отримуй третій (менший за ціною) у подарунок!',
    code: 'BURGER3',
    expiry: 'До 31.05',
    color: 'var(--accent)',
    icon: <LocalOffer />,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Безкоштовна доставка',
    description: 'Замовляй на суму від 500₴ та не плати за доставку в будь-яку точку міста.',
    code: 'FREEDEL',
    expiry: 'Тільки сьогодні',
    color: '#3b82f6',
    icon: <DeliveryDining />,
    image: Delivery
  }
];

const Promo = () => {
  const navigate = useNavigate();

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Промокод ${code} скопійовано!`);
  };

  return (
    <Box sx={{ backgroundColor: 'var(--bg)', minHeight: '100vh', py: 10 }}>
      <Container maxWidth="lg">
        {/* --- HEADER --- */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ textAlign: 'center', mb: 8 }}
        >
          <Box sx={{
            display: 'inline-flex', alignItems: 'center', gap: 1.5, px: 2, py: 0.8,
            bgcolor: 'rgba(255, 122, 24, 0.08)', borderRadius: '100px', mb: 3,
            border: '1px solid rgba(255, 122, 24, 0.2)'
          }}>
            <LocalOffer sx={{ color: 'var(--primary)', fontSize: '20px' }} />
            <Typography variant="caption" sx={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5 }}>
              Найкращі пропозиції
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ color: 'var(--text-primary)', fontWeight: 900, mb: 2 }}>
            Наші <span style={{ color: 'var(--primary)' }}>Акції</span>
          </Typography>
          <Typography variant="h6" sx={{ color: 'var(--text-secondary)', fontWeight: 400, maxWidth: '600px', mx: 'auto' }}>
            Смакуйте більше, витрачайте менше! Обирайте вигідну пропозицію та замовляйте прямо зараз.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {promotions.map((promo, index) => (
            <Grid key={promo.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <Paper
                component={motion.div}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                sx={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-cards)',
                  border: '1px solid var(--borders)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    borderColor: promo.color,
                    boxShadow: `0 20px 40px ${promo.color}15`,
                    transform: 'translateY(-10px)'
                  }
                }}
              >
                <Box sx={{ position: 'relative', height: '200px' }}>
                  <Box
                    component="img"
                    src={promo.image}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Chip
                    icon={<Timer sx={{ fontSize: '16px !important', color: '#fff !important' }} />}
                    label={promo.expiry}
                    sx={{
                      position: 'absolute', top: 15, right: 15,
                      bgcolor: 'rgba(0,0,0,0.6)', color: '#fff',
                      backdropFilter: 'blur(10px)', fontWeight: 700
                    }}
                  />
                  <Box sx={{
                    position: 'absolute', bottom: -20, left: 20,
                    width: '50px', height: '50px', bgcolor: promo.color,
                    borderRadius: '12px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: '#fff', boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                  }}>
                    {promo.icon}
                  </Box>
                </Box>

                <Box sx={{ p: 4, pt: 5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--text-primary)', mb: 1.5 }}>
                    {promo.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 3, lineHeight: 1.6 }}>
                    {promo.description}
                  </Typography>

                  <Box
                    onClick={() => handleCopyCode(promo.code)}
                    sx={{
                      p: 2, borderRadius: '12px', border: '2px dashed var(--borders)',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      cursor: 'pointer', mb: 3, transition: '0.2s',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', borderColor: promo.color }
                    }}
                  >
                    <Typography sx={{ fontWeight: 800, color: promo.color, letterSpacing: 2 }}>
                      {promo.code}
                    </Typography>
                    <ContentCopy sx={{ color: 'var(--text-secondary)', fontSize: '18px' }} />
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/menu')}
                    sx={{
                      mt: 'auto',
                      bgcolor: promo.color,
                      borderRadius: '12px',
                      py: 1.5,
                      fontWeight: 700,
                      textTransform: 'none',
                      '&:hover': { bgcolor: promo.color, filter: 'brightness(1.1)' }
                    }}
                  >
                    Скористатись акцією
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 10, p: 4, borderRadius: '24px', bgcolor: 'rgba(255, 122, 24, 0.05)', border: '1px solid rgba(255, 122, 24, 0.1)', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
            * Акції не сумуються між собою. Детальні умови запитуйте у оператора або в закладі.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export { Promo };
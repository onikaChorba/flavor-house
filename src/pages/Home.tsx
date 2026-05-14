import { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Stack, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BurgerHero } from '../components';
import {
  RestaurantMenu, LocalFireDepartment,
  LunchDining, LocalPizza, LocalBar, Icecream,
  SetMeal, RocketLaunch, Verified, Group
} from "@mui/icons-material"
import BurgerImg from "./../assets/img/hero.png";

const categoryTranslations: Record<string, string> = {
  'burgers': 'Бургери',
  'pizzas': 'Піца',
  'drinks': 'Напої',
  'desserts': 'Десерти',
  'steaks': 'Стейки',
  'sandwiches': 'Сендвічі',
  'bbq': 'Барбекю',
  'fried-chicken': 'Курка',
  'ice-cream': 'Морозиво',
  'all': 'Все меню'
};

const getCategoryIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('burg')) return <LunchDining />;
  if (n.includes('pizz')) return <LocalPizza />;
  if (n.includes('drink')) return <LocalBar />;
  if (n.includes('dessert') || n.includes('ice')) return <Icecream />;
  if (n.includes('steak') || n.includes('bbq') || n.includes('meat')) return <SetMeal />;
  return <RestaurantMenu />;
};

const stats = [
  { icon: <RocketLaunch />, label: 'Швидка доставка', value: '30 хв', color: 'var(--primary)' },
  { icon: <Verified />, label: 'Якість продуктів', value: '100%', color: 'var(--accent)' },
  { icon: <Group />, label: 'Задоволених клієнтів', value: '10k+', color: '#3b82f6' },
];

const Home = () => {
  const navigate = useNavigate();
  const [apiCategories, setApiCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://free-food-menus-api-two.vercel.app/all')
      .then(res => res.json())
      .then((data) => {
        setApiCategories(Object.keys(data));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        pb: { xs: 8, md: 0 }
      }}>
        <Box
          component={motion.div}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          sx={{
            position: 'absolute', top: '10%', right: '5%', width: '500px', height: '500px',
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
            filter: 'blur(100px)', opacity: 0.15, zIndex: 0
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4, // Заміна spacing={4}
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              sx={{ maxWidth: { xs: '100%', md: '500px' }, textAlign: { xs: 'center', md: 'left' } }}
            >
              <Stack spacing={4}>
                <Box sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 1.5, px: 2, py: 0.8,
                  bgcolor: 'rgba(255, 122, 24, 0.08)', borderRadius: '100px', width: 'fit-content',
                  border: '1px solid rgba(255, 122, 24, 0.2)', mx: { xs: 'auto', md: 0 }
                }}>
                  <LocalFireDepartment sx={{ color: 'var(--primary)', fontSize: '20px' }} />
                  <Typography variant="caption" sx={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                    Гаряча доставка 24/7
                  </Typography>
                </Box>

                <Typography variant="h1" sx={{
                  color: 'var(--text-primary)', fontWeight: 900,
                  fontSize: { xs: '3.5rem', md: '5.5rem' }, lineHeight: 1, letterSpacing: '-0.02em'
                }}>
                  Смак, що має <br />
                  <Box component="span" sx={{
                    color: 'var(--primary)',
                  }}>Характер</Box>
                </Typography>

                <Typography variant="h6" sx={{ color: 'var(--text-secondary)', fontWeight: 400, lineHeight: 1.7, fontSize: '1.1rem', maxWidth: '500px' }}>
                  Ми не просто готуємо їжу, ми створюємо гастрономічні шедеври. Скуштуй легендарні страви, виготовлені з любов'ю.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variant="contained" size="large"
                    onClick={() => navigate('/menu')}
                    startIcon={<RestaurantMenu />}
                    sx={{
                      bgcolor: 'var(--primary)', color: '#fff', borderRadius: '16px', px: 5, py: 2.2,
                      fontSize: '1.1rem', fontWeight: 700, textTransform: 'none',
                      boxShadow: '0 10px 30px rgba(255, 122, 24, 0.3)',
                      '&:hover': { bgcolor: 'var(--btn-hover)' },
                    }}
                  >
                    Відкрити Меню
                  </Button>
                </Stack>
              </Stack>
            </Box>

            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring" }}
            >
              <BurgerHero BurgerImg={BurgerImg} />
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
              <Paper
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                elevation={0}
                sx={{
                  p: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  borderRadius: '24px',
                  bgcolor: 'var(--bg-cards)',
                  border: '1px solid var(--borders)',
                }}
              >
                <Box sx={{
                  p: 2, borderRadius: '18px', bgcolor: `${stat.color}15`, color: stat.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--text-primary)' }}>{stat.value}</Typography>
                  <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>{stat.label}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ pb: 10, position: 'relative', zIndex: 1 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          sx={{ mb: 6, textAlign: { xs: 'center', md: 'left' } }}
        >
          <Typography variant="h4" sx={{ color: 'var(--text-primary)', fontWeight: 800, mb: 1 }}>
            Популярні <span style={{ color: 'var(--accent)' }}>Категорії</span>
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--text-secondary)' }}>
            Оберіть улюблену страву за лічені секунди
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {!loading && apiCategories.slice(0, 8).map((catName, index) => (
            <Grid key={catName} size={{ xs: 6, sm: 4, md: 3 }}>
              <Paper
                component={motion.div}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                elevation={0}
                onClick={() => navigate(`/menu?tab=${catName}`)}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  borderRadius: '24px',
                  backgroundColor: 'var(--bg-cards)',
                  border: '1px solid var(--borders)',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  '&:hover': {
                    borderColor: 'var(--accent)',
                    transform: 'translateY(-10px) rotate(2deg)',
                    boxShadow: '0 20px 40px rgba(46, 211, 183, 0.15)',
                    '& .icon-box': {
                      backgroundColor: 'var(--accent)',
                      color: 'var(--bg)',
                      transform: 'scale(1.1) rotate(-10deg)'
                    }
                  }
                }}
              >
                <Box
                  className="icon-box"
                  sx={{
                    width: '60px', height: '60px', mx: 'auto', mb: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: '16px', backgroundColor: 'rgba(46, 211, 183, 0.1)',
                    color: 'var(--accent)', transition: '0.4s'
                  }}
                >
                  {getCategoryIcon(catName)}
                </Box>
                <Typography variant="h6" sx={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.1rem' }}>
                  {categoryTranslations[catName] || catName}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export { Home };
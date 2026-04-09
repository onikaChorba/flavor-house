import { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Stack, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import IcecreamIcon from '@mui/icons-material/Icecream';
import SetMealIcon from '@mui/icons-material/SetMeal';
import { BurgerHero } from '../components';
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
  if (n.includes('burg')) return <LunchDiningIcon />;
  if (n.includes('pizz')) return <LocalPizzaIcon />;
  if (n.includes('drink')) return <LocalBarIcon />;
  if (n.includes('dessert') || n.includes('ice')) return <IcecreamIcon />;
  if (n.includes('steak') || n.includes('bbq') || n.includes('meat')) return <SetMealIcon />;
  return <RestaurantMenuIcon />;
};

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
        <Box sx={{
          position: 'absolute', top: '20%', right: '10%', width: '500px', height: '500px',
          background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
          filter: 'blur(120px)', opacity: 0.1, zIndex: 0
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack spacing={4} sx={{ maxWidth: { xs: '100%', md: '600px' }, textAlign: { xs: 'center', md: 'left' } }}>
              <Box sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1.5, px: 2, py: 0.8,
                bgcolor: 'rgba(255, 122, 24, 0.08)', borderRadius: '100px', width: 'fit-content',
                border: '1px solid rgba(255, 122, 24, 0.2)', mx: { xs: 'auto', md: 0 }
              }}>
                <LocalFireDepartmentIcon sx={{ color: 'var(--primary)', fontSize: '20px' }} />
                <Typography variant="caption" sx={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                  Гаряча доставка 24/7
                </Typography>
              </Box>

              <Typography variant="h1" sx={{
                color: 'var(--text-primary)', fontWeight: 900,
                fontSize: { xs: '3.5rem', md: '5.5rem' }, lineHeight: 1, letterSpacing: '-0.02em'
              }}>
                Смак, що має <br />
                <span style={{ color: 'var(--primary)', textShadow: '0 0 30px rgba(255, 122, 24, 0.3)' }}>Характер</span>
              </Typography>

              <Typography variant="h6" sx={{ color: 'var(--text-secondary)', fontWeight: 400, lineHeight: 1.7, fontSize: '1.1rem', maxWidth: '500px' }}>
                Ми не просто готуємо їжу, ми створюємо гастрономічні шедеври з найкращих інгредієнтів. Скуштуй легендарні страви.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button
                  variant="contained" size="large"
                  onClick={() => navigate('/menu')}
                  startIcon={<RestaurantMenuIcon />}
                  sx={{
                    bgcolor: 'var(--primary)', color: '#fff', borderRadius: '16px', px: 5, py: 2.2,
                    fontSize: '1.1rem', fontWeight: 700, textTransform: 'none',
                    boxShadow: '0 10px 30px rgba(255, 122, 24, 0.3)',
                    '&:hover': { bgcolor: 'var(--btn-hover)', transform: 'translateY(-3px)' },
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                >
                  Відкрити Меню
                </Button>
              </Stack>
            </Stack>

            <BurgerHero BurgerImg={BurgerImg} />
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 10, position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 6, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h4" sx={{ color: 'var(--text-primary)', fontWeight: 800, mb: 1 }}>
            Популярні <span style={{ color: 'var(--accent)' }}>Категорії</span>
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--text-secondary)' }}>
            Оберіть улюблену страву за лічені секунди
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {!loading && apiCategories.slice(0, 8).map((catName) => (
            <Grid key={catName} size={{ xs: 6, sm: 4, md: 3 }}>
              <Paper
                elevation={0}
                onClick={() => navigate(`/menu?tab=${catName}`)}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  borderRadius: '24px',
                  backgroundColor: 'var(--bg-cards)',
                  border: '1px solid var(--borders)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'var(--accent)',
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(46, 211, 183, 0.1)',
                    '& .icon-box': {
                      backgroundColor: 'var(--accent)',
                      color: 'var(--bg)',
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
                    color: 'var(--accent)', transition: '0.3s'
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
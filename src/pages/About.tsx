import { Container, Typography, Box, Avatar, Button } from '@mui/material';
import { motion } from 'framer-motion';
import AboutImg from "./../assets/img/about.png"
import { HistoryEdu, Groups, Favorite } from '@mui/icons-material';

const About = () => {
  return (
    <Box sx={{ backgroundColor: 'var(--bg)', minHeight: '100vh', py: 10, color: 'var(--text-primary)' }}>
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ textAlign: 'center', mb: 12 }}
        >
          <Typography variant="overline" sx={{ color: 'var(--primary)', fontWeight: 800, letterSpacing: 4 }}>
            FLAVOR HOUSE
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, mt: 2, lineHeight: 1.1 }}>
            Ми готуємо не їжу, <br /> ми готуємо <span style={{ color: 'var(--primary)' }}>емоції</span>.
          </Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 8,
          alignItems: 'center',
          mb: 15
        }}>
          <Box sx={{ flex: 1, width: '100%' }}>
            <Box
              component={motion.img}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              src={AboutImg}
              sx={{
                width: '100%',
                borderRadius: '40px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
                display: 'block'
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Box sx={{ mb: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <HistoryEdu sx={{ color: 'var(--primary)' }} />
                <Typography variant="h5" sx={{ fontWeight: 800 }}>Наша історія</Typography>
              </Box>
              <Typography sx={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                Від маленького фуд-трака на околиці міста до улюбленого місця тисяч гурманів. Ми пройшли шлях випробувань, щоб знайти той самий ідеальний рецепт булочки та соковитої котлети.
              </Typography>
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Favorite sx={{ color: 'var(--accent)' }} />
                <Typography variant="h5" sx={{ fontWeight: 800 }}>Чому ми?</Typography>
              </Box>
              <Typography sx={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                Бо ми не йдемо на компроміси з якістю. Якщо томати — то тільки найстигліші. Якщо м'ясо — то тільки свіжий Prime Cut. Ми фанати своєї справи.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          mb: 15
        }}>
          {[
            { icon: <Groups />, title: 'Команда', desc: 'Люди, які обожнюють готувати.' },
            { icon: <Favorite />, title: 'Любов', desc: 'Головний інгредієнт кожної страви.' },
            { icon: <HistoryEdu />, title: 'Якість', desc: 'Без компромісів та напівфабрикатів.' }
          ].map((item, i) => (
            <Box
              key={i}
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              sx={{
                flex: 1,
                p: 5,
                bgcolor: 'var(--bg-cards)',
                borderRadius: '30px',
                border: '1px solid var(--borders)',
                textAlign: 'center'
              }}
            >
              <Box sx={{ color: 'var(--primary)', mb: 2 }}>{item.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{item.title}</Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>{item.desc}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{
          py: 8,
          mt: 12,
          mb: 12,
          borderTop: '1px solid var(--borders)',
          borderBottom: '1px solid var(--borders)',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-around',
          gap: 4
        }}>
          {[
            { label: 'Задоволених клієнтів', value: '50k+' },
            { label: 'Років на ринку', value: '5+' },
            { label: 'Авторських рецептів', value: '120' },
            { label: 'Хвилин середня доставка', value: '35' }
          ].map((stat, i) => (
            <Box
              key={i}
              component={motion.div}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              sx={{ textAlign: 'center' }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  color: 'var(--primary)',
                  mb: 1,
                  fontFamily: 'monospace'
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="button"
                sx={{
                  color: 'var(--text-secondary)',
                  fontWeight: 700,
                  letterSpacing: 1
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 8 }}>Команда мрії</Typography>
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 6
          }}>
            {[1, 2, 3].map((num) => (
              <Box key={num} sx={{ textAlign: 'center' }}>
                <Avatar
                  src={`https://i.pravatar.cc/150?u=${num}`}
                  sx={{ width: 140, height: 140, mb: 2, border: '4px solid var(--borders)' }}
                />
                <Typography sx={{ fontWeight: 800 }}>Майстер Смаку #{num}</Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>Шеф-кухар</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          sx={{
            mt: 15,
            p: { xs: 4, md: 8 },
            borderRadius: '40px',
            color: '#fff',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 20px rgba(255, 122, 24, 0.3)'
          }}
        >
          {/* Декоративний елемент на фоні */}
          <Groups sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            fontSize: '200px',
            opacity: 0.1,
            transform: 'rotate(-15deg)'
          }} />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>
              Хочеш до нас у команду?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: '700px', mx: 'auto', fontWeight: 400 }}>
              Ми завжди шукаємо талановитих кухарів, енергійних кур'єрів та привітних менеджерів, які поділяють нашу любов до гастрономії.
            </Typography>

            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              gap: 2
            }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#fff',
                  color: 'var(--primary)',
                  px: 4,
                  py: 1.5,
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '1rem',
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#f0f0f0' }
                }}
                onClick={() => window.location.href = 'mailto:hr@flavorhouse.com'}
              >
                Надіслати резюме
              </Button>

              <Button
                variant="outlined"
                sx={{
                  borderColor: '#fff',
                  color: '#fff',
                  px: 4,
                  py: 1.5,
                  borderRadius: '12px',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderWidth: '2px',
                  '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)', borderWidth: '2px' }
                }}
                onClick={() => window.open('https://t.me/your_hr_bot', '_blank')}
              >
                Написати в Telegram
              </Button>
            </Box>

            <Typography variant="caption" sx={{ display: 'block', mt: 3, opacity: 0.8, letterSpacing: 1 }}>
              * Відповідаємо протягом 24 годин
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export { About };
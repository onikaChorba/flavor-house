import { Container, Typography, Box, IconButton, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Cart = () => {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert('Замовлення успішно оформлено! Дякуємо, що обрали Flavor House! 🎉');
    clearCart();
  };

  return (
    <Box sx={{ backgroundColor: 'var(--bg)', minHeight: '100vh', py: { xs: 4, md: 8 }, color: '#fff' }}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Button
            startIcon={<ArrowBackIosNewIcon sx={{ fontSize: '14px !important' }} />}
            sx={{ color: 'var(--text-secondary)', textTransform: 'none', fontWeight: 600 }}
            onClick={() => window.history.back()}
          >
            Кошик ({totalItems} товари)
          </Button>
          <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: 1 }}>FLAVOR HOUSE</Typography>
          <Box sx={{ width: 80 }} />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{
            bgcolor: 'var(--bg-cards)', borderRadius: '24px', border: '1px solid var(--borders)', p: 3,
            display: 'flex', flexDirection: 'column', gap: 2
          }}>
            <AnimatePresence initial={false}>
              {cartItems.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Typography sx={{ color: 'var(--text-secondary)', mb: 2 }}>Ваш кошик порожній 🛒</Typography>
                  <Button variant="outlined" sx={{ color: 'var(--primary)', borderColor: 'var(--primary)' }} onClick={() => window.history.back()}>
                    Повернутися до меню
                  </Button>
                </Box>
              ) : (
                cartItems.map((item: any) => (
                  <Box
                    key={item.id}
                    component={motion.div}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    sx={{ display: 'flex', alignItems: 'center', gap: 2, pb: 2, borderBottom: '1px solid rgba(255,255,255,0.05)', '&:last-child': { borderBottom: 'none', pb: 0 } }}
                  >
                    {item.image && (
                      <Box component="img" src={item.image} alt={item.name} sx={{ width: 70, height: 70, borderRadius: '16px', objectFit: 'cover' }} />
                    )}

                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}>{item.name}</Typography>
                      <Typography variant="caption" sx={{ color: 'var(--text-secondary)', display: 'block', mb: 1.5 }}>{item.description}</Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <IconButton size="small" onClick={() => updateQuantity(item.id, -1)} sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: '#fff' }}>
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ fontWeight: 700 }}>{item.quantity}</Typography>
                        <IconButton size="small" onClick={() => updateQuantity(item.id, 1)} sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: '#fff' }}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{(item.price * item.quantity).toFixed(2)} ₴</Typography>
                      <IconButton size="small" onClick={() => removeItem(item.id)} sx={{ color: 'rgba(255,255,255,0.3)', '&:hover': { color: '#ff4444' } }}>
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))
              )}
            </AnimatePresence>
          </Box>

          {cartItems.length > 0 && (
            <Box sx={{ bgcolor: 'var(--bg-cards)', borderRadius: '24px', border: '1px solid var(--borders)', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <Typography variant="body2">Сума замовлення</Typography>
                <Typography variant="body2">{totalPrice.toFixed(2)} ₴</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', my: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>Разом</Typography>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>{totalPrice.toFixed(2)} ₴</Typography>
              </Box>

              <Button
                variant="contained" fullWidth startIcon={<ShoppingBagIcon />} onClick={handleCheckout}
                sx={{
                  bgcolor: 'var(--primary)', color: '#fff', py: 2, borderRadius: '16px', fontWeight: 800, fontSize: '1rem', textTransform: 'none',
                  boxShadow: '0 10px 25px rgba(255, 122, 24, 0.2)', '&:hover': { bgcolor: 'var(--primary)', filter: 'brightness(1.1)' }
                }}
              >
                ОФОРМИТИ ЗАМОВЛЕННЯ ({totalPrice.toFixed(2)} ₴)
              </Button>
            </Box>
          )}

        </Box>
      </Container>
    </Box>
  );
};

export { Cart };
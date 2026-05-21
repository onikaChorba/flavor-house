import { Typography, Box, IconButton, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context';
import { ShoppingBag, DeleteOutline, Add, Remove } from '@mui/icons-material'

const Cart = () => {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert('Замовлення успішно оформлено! Дякуємо, що обрали Flavor House! 🎉');
    clearCart();
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
      backgroundColor: 'transparent'
    }}>
      <Box sx={{
        flexGrow: 1,
        overflowY: 'auto',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5
      }}>
        <AnimatePresence initial={false}>
          {cartItems.length === 0 ? (
            <Box sx={{
              textAlign: 'center',
              py: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}>
              <Typography variant="h6" sx={{ color: 'var(--text-secondary)', fontWeight: 600, mb: 1, fontSize: '1.1rem' }}>
                Кошик порожній 🛒
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.4)', maxWidth: '240px', lineHeight: 1.4 }}>
                Додайте щось смачненьке з нашого меню, щоб зробити замовлення.
              </Typography>
            </Box>
          ) : (
            cartItems.map((item: any) => (
              <Box
                key={item.id}
                component={motion.div}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.2 }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  pb: 2.5,
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                {item.image && (
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: 76,
                      height: 76,
                      borderRadius: '16px',
                      objectFit: 'cover',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  />
                )}

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="subtitle1"
                    noWrap
                    sx={{
                      fontWeight: 700,
                      lineHeight: 1.2,
                      mb: 0.5,
                      color: '#fff'
                    }}
                  >
                    {item.name}
                  </Typography>

                  <Typography
                    variant="caption"
                    noWrap
                    sx={{
                      color: 'var(--text-secondary)',
                      display: 'block',
                      mb: 1.5
                    }}
                  >
                    {item.description}
                  </Typography>

                  <Box sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    p: '2px'
                  }}>
                    <IconButton
                      size="small"
                      onClick={() => item.quantity > 1 ? updateQuantity(item.id, -1) : removeItem(item.id)}
                      sx={{ color: 'var(--text-secondary)', p: 0.5 }}
                    >
                      <Remove sx={{ fontSize: '16px' }} />
                    </IconButton>
                    <Typography sx={{ fontWeight: 700, minWidth: '24px', textAlign: 'center', fontSize: '0.9rem', color: '#fff' }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.id, 1)}
                      sx={{ color: 'var(--text-secondary)', p: 0.5 }}
                    >
                      <Add sx={{ fontSize: '16px' }} />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: 76 }}>
                  <IconButton
                    size="small"
                    onClick={() => removeItem(item.id)}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.25)',
                      p: 0.5,
                      '&:hover': { color: '#ff4444', backgroundColor: 'rgba(255, 68, 68, 0.1)' }
                    }}
                  >
                    <DeleteOutline sx={{ fontSize: '18px' }} />
                  </IconButton>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'var(--accent)', fontSize: '1rem' }}>
                    {(item.price * item.quantity).toFixed(2)} ₴
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </AnimatePresence>
      </Box>

      {cartItems.length > 0 && (
        <Box sx={{
          p: 3,
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          backgroundColor: 'rgba(24, 24, 24, 0.4)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
              До сплати:
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#fff', letterSpacing: -0.5 }}>
              {totalPrice.toFixed(2)} ₴
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            startIcon={<ShoppingBag />}
            onClick={handleCheckout}
            sx={{
              backgroundColor: 'var(--primary)',
              color: '#fff',
              py: 1.8,
              borderRadius: '14px',
              fontWeight: 800,
              fontSize: '0.95rem',
              textTransform: 'none',
              boxShadow: '0 8px 24px rgba(255, 122, 24, 0.25)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'var(--btn-hover)',
                boxShadow: '0 12px 28px rgba(255, 122, 24, 0.35)',
                transform: 'translateY(-1px)'
              },
              '&:active': { transform: 'translateY(0)' }
            }}
          >
            Оформити замовлення
          </Button>
        </Box>
      )}

    </Box>
  );
};

export { Cart };
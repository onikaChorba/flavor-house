import { useState, useRef } from 'react';
import { Typography, Box, IconButton, Button } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { useCart } from '../../context';
import { ShoppingBag, DeleteOutline, Add, Remove, ArrowBackIos } from '@mui/icons-material';
import { DeliveryForm } from '../deliveryForm/deliveryForm';

const Cart = () => {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');

  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comments: ''
  });

  const itemsPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryPrice = deliveryMethod === 'pickup' || itemsPrice >= 500 ? 0 : 60;
  const finalTotalPrice = itemsPrice + deliveryPrice;

  const handleActionClick = () => {
    if (!isFormVisible) {
      setIsFormVisible(true);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim() || (deliveryMethod === 'delivery' && !formData.address.trim())) {
      alert('Будь ласка, заповніть усі обов’язкові поля! 📝');
      return;
    }

    const successMessage = deliveryMethod === 'delivery'
      ? `🎉 Замовлення успішно оформлено!\n\nДякуємо, ${formData.name}! Кур'єр привезе їжу за адресою: ${formData.address}.\nСума до сплати: ${finalTotalPrice.toFixed(2)} ₴`
      : `🎉 Замовлення успішно оформлено!\n\nДякуємо, ${formData.name}! Чекаємо на вас у нашому ресторані на самовивіз.\nСума до сплати: ${finalTotalPrice.toFixed(2)} ₴`;

    alert(successMessage);

    clearCart();
    setIsFormVisible(false);
    setFormData({ name: '', phone: '', address: '', comments: '' });
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
      backgroundColor: 'transparent'
    }}>
      {isFormVisible && (
        <Box sx={{ p: '12px 24px 0', display: 'flex', alignItems: 'center' }}>
          <Button
            startIcon={<ArrowBackIos sx={{ fontSize: '12px !important', ml: 0.5 }} />}
            onClick={() => setIsFormVisible(false)}
            sx={{ color: 'var(--text-secondary)', textTransform: 'none', fontSize: '0.85rem', fontWeight: 600, '&:hover': { color: '#fff' } }}
          >
            Назад до страв
          </Button>
        </Box>
      )}
      <Box sx={{
        flexGrow: 1,
        overflowY: 'auto',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3.5
      }}>
        <AnimatePresence mode="wait">
          {cartItems.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Typography variant="h6" sx={{ color: 'var(--text-secondary)', fontWeight: 600, mb: 1, fontSize: '1.1rem' }}>
                Кошик порожній 🛒
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.4)', maxWidth: '240px', lineHeight: 1.4 }}>
                Додайте щось смачненьке з нашого меню, щоб зробити замовлення.
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, opacity: isFormVisible ? 0.6 : 1, transition: 'opacity 0.2s' }}>
                {cartItems.map((item: any) => (
                  <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {item.image && (
                      <Box component="img" src={item.image} alt={item.name} sx={{ width: 76, height: 76, borderRadius: '16px', objectFit: 'cover', border: '1px solid rgba(255, 255, 255, 0.05)' }} />
                    )}

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5, color: '#fff' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" noWrap sx={{ color: 'var(--text-secondary)', display: 'block', mb: 1.5 }}>
                        {item.description}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)', p: '2px' }}>
                          <IconButton disabled={isFormVisible} size="small" onClick={() => item.quantity > 1 ? updateQuantity(item.id, -1) : removeItem(item.id)} sx={{ color: 'var(--text-secondary)', p: 0.5 }}>
                            <Remove sx={{ fontSize: '16px' }} />
                          </IconButton>
                          <Typography sx={{ fontWeight: 700, minWidth: '24px', textAlign: 'center', fontSize: '0.9rem', color: '#fff' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton disabled={isFormVisible} size="small" onClick={() => updateQuantity(item.id, 1)} sx={{ color: 'var(--text-secondary)', p: 0.5 }}>
                            <Add sx={{ fontSize: '16px' }} />
                          </IconButton>
                        </Box>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.35)', fontWeight: 500 }}>
                          {item.quantity} × {item.price.toFixed(2)} ₴
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: 76 }}>
                      <IconButton disabled={isFormVisible} size="small" onClick={() => removeItem(item.id)} sx={{ color: 'rgba(255, 255, 255, 0.25)', p: 0.5, '&:hover': { color: '#ff4444', backgroundColor: 'rgba(255, 68, 68, 0.1)' } }}>
                        <DeleteOutline sx={{ fontSize: '18px' }} />
                      </IconButton>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'var(--accent)', fontSize: '1rem' }}>
                        {(item.price * item.quantity).toFixed(2)} ₴
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {!isFormVisible && (
                <Box sx={{
                  display: 'flex',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  p: '4px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <Button
                    fullWidth
                    onClick={() => setDeliveryMethod('delivery')}
                    sx={{
                      borderRadius: '9px',
                      textTransform: 'none',
                      fontWeight: 700,
                      color: deliveryMethod === 'delivery' ? '#fff' : 'var(--text-secondary)',
                      backgroundColor: deliveryMethod === 'delivery' ? 'rgba(255,255,255,0.07)' : 'transparent',
                      '&:hover': { backgroundColor: deliveryMethod === 'delivery' ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.02)' }
                    }}
                  >
                    🚗 Доставка
                  </Button>
                  <Button
                    fullWidth
                    onClick={() => setDeliveryMethod('pickup')}
                    sx={{
                      borderRadius: '9px',
                      textTransform: 'none',
                      fontWeight: 700,
                      color: deliveryMethod === 'pickup' ? '#fff' : 'var(--text-secondary)',
                      backgroundColor: deliveryMethod === 'pickup' ? 'rgba(255,255,255,0.07)' : 'transparent',
                      '&:hover': { backgroundColor: deliveryMethod === 'pickup' ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.02)' }
                    }}
                  >
                    🛍️ Самовивіз
                  </Button>
                </Box>
              )}

              {isFormVisible && (
                <DeliveryForm ref={formRef} formData={formData} setFormData={setFormData} deliveryMethod={deliveryMethod} />
              )}

            </Box>
          )}
        </AnimatePresence>
      </Box>

      {cartItems.length > 0 && (
        <Box sx={{
          p: 3,
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          backgroundColor: 'rgba(24, 24, 24, 0.6)',
          backdropFilter: 'blur(15px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>Страви:</Typography>
            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>{itemsPrice.toFixed(2)} ₴</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>Отримання:</Typography>
            <Typography variant="body2" sx={{ color: deliveryPrice === 0 ? '#4cd137' : '#fff', fontWeight: 600 }}>
              {deliveryMethod === 'pickup' ? 'Самовивіз (0 ₴)' : (deliveryPrice === 0 ? 'Безкоштовна доставка' : `${deliveryPrice.toFixed(2)} ₴`)}
            </Typography>
          </Box>

          {itemsPrice < 500 && deliveryMethod === 'delivery' && (
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.3)', fontStyle: 'italic', mt: -0.5 }}>
              💡 Додайте страв ще на {(500 - itemsPrice).toFixed(0)} ₴ для безкоштовної доставки
            </Typography>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 1 }}>
            <Typography variant="body1" sx={{ color: '#fff', fontWeight: 700 }}>Разом:</Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: 'var(--accent)', letterSpacing: -0.5 }}>
              {finalTotalPrice.toFixed(2)} ₴
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            startIcon={<ShoppingBag />}
            onClick={handleActionClick}
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
            {isFormVisible ? 'Підтвердити замовлення' : 'Оформити замовлення'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export { Cart };
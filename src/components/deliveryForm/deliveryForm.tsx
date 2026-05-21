import React, { forwardRef } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { motion } from 'framer-motion';

interface DeliveryFormProps {
  formData: { name: string; phone: string; address: string; comments: string };
  setFormData: React.Dispatch<React.SetStateAction<{ name: string; phone: string; address: string; comments: string }>>;
  deliveryMethod: 'delivery' | 'pickup';
}

const DeliveryForm = forwardRef<HTMLDivElement, DeliveryFormProps>(({ formData, setFormData, deliveryMethod }, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      color: '#fff',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '12px',
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.08)' },
      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
      '&.Mui-focused fieldset': { borderColor: 'var(--primary)' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.4)' },
    '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary)' },
  };

  return (
    <Box
      ref={ref}
      component={motion.div}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.3 }}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
    >
      <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', mb: 0.5 }}>
        {deliveryMethod === 'delivery' ? '📍 Дані для доставки' : '🛍️ Контакти для самовивозу'}
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Ім'я"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          size="small"
          required
          sx={inputStyles}
        />
        <TextField
          label="Телефон"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          size="small"
          required
          placeholder="+380"
          sx={inputStyles}
        />
      </Box>

      {deliveryMethod === 'delivery' ? (
        <TextField
          label="Адреса доставки (Вулиця, будинок, квартира)"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          size="small"
          required
          sx={inputStyles}
        />
      ) : (
        <Box sx={{ p: 2, borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)' }}>
          <Typography variant="caption" sx={{ color: 'var(--text-secondary)', display: 'block' }}>
            🏪 Адреса ресторану:
          </Typography>
          <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>
            вул. Хрещатик, 12, Київ (Flavor House)
          </Typography>
        </Box>
      )}

      <TextField
        label="Коментар до замовлення"
        name="comments"
        value={formData.comments}
        onChange={handleChange}
        fullWidth
        size="small"
        multiline
        rows={2}
        sx={inputStyles}
      />
    </Box>
  );
});

DeliveryForm.displayName = 'DeliveryForm';

export { DeliveryForm };
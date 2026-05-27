import React, { useState, useMemo } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Remove, Add } from '@mui/icons-material';
import {
  Card, CardMedia, CardContent, Typography, Box, Button, IconButton
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { useCart } from '../../context';

interface MenuCardProps {
  item: {
    id: string;
    img: string;
    name: string;
    dsc: string;
    price: number;
    rate: number;
    country: string;
  };
}

const placeholderTexts = [
  "Шеф-кухар з'їв це, поки ми фотографували 🤤",
  "Настільки смачно, що камера розплавилася 🔥",
  "Фотограф пішов за добавкою і не повернувся 🚶‍♂️"
];

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { addToCart } = useCart();
  const [imgError, setImgError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      description: item.dsc,
      price: item.price,
      quantity: quantity,
      image: item.img || ''
    });
    setQuantity(1);
  };

  const randomText = useMemo(() =>
    placeholderTexts[Math.floor(Math.random() * placeholderTexts.length)],
    []);

  const productPrice = quantity * item.price;

  const tasteStatus = useMemo(() => {
    if (item.rate >= 5) return 'Легендарно';
    if (item.rate >= 4.5) return 'Шедевр';
    return 'Рекомендуємо';
  }, [item.rate]);

  return (
    <Card
      role="region"
      aria-label={`Картка страви: ${item.name}`}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        overflow: 'hidden',
        position: 'relative',
        '&:hover': {
          '& .product-image': {
            transform: 'scale(1.04) translateY(-4px)',
            borderRadius: '28px',
          },
          '& .bg-country-text': {
            opacity: 0.06,
            transform: 'translateX(0)'
          }
        }
      }}
    >
      <Box sx={{ position: 'relative', height: 220, overflow: 'hidden', display: 'flex', borderRadius: '22px' }}>
        {!imgError && item.img ? (
          <CardMedia
            component="img"
            image={item.img}
            alt={item.name}
            className="product-image"
            sx={{
              objectFit: 'cover',
              height: '100%',
              width: '100%',
              borderRadius: '22px',
              transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
            onError={() => setImgError(true)}
          />
        ) : (
          <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            borderRadius: '22px',
            background: 'linear-gradient(135deg, rgba(35,35,35,0.6) 0%, rgba(20,20,20,0.6) 100%)',
            color: 'var(--text-secondary)',
          }}>
            <FastfoodIcon sx={{ fontSize: 40, mb: 1, color: 'var(--primary)', opacity: 0.6 }} />
            <Typography variant="body2" sx={{ fontStyle: 'italic', fontSize: '0.8rem' }}>
              {randomText}
            </Typography>
          </Box>
        )}
        <Box sx={{
          position: 'absolute',
          top: 14,
          right: 14,
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(8px)',
          borderRadius: '30px',
          px: 1.5, py: 0.6,
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <StarIcon sx={{ color: '#FFD700', fontSize: '14px' }} />
          <Typography variant="caption" sx={{ color: '#fff', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.2px' }}>
            {item.rate.toFixed(1)} <span style={{ opacity: 0.6, fontWeight: 400, marginLeft: '2px' }}>• {tasteStatus}</span>
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', px: 1, pt: 2, pb: 0, position: 'relative' }}>
        <Typography
          className="bg-country-text"
          variant="h3"
          sx={{
            position: 'absolute',
            right: -10,
            bottom: 60,
            fontWeight: 900,
            color: '#fff',
            opacity: 0.02,
            pointerEvents: 'none',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: '2.5rem',
            transform: 'translateX(10px)',
            transition: 'all 0.5s ease',
            whiteSpace: 'nowrap'
          }}
        >
          {item.country}
        </Typography>

        <Box sx={{ mb: 1 }}>
          <Typography variant="caption" sx={{ color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', display: 'block', mb: 0.2 }}>
            {item.country} рецепт
          </Typography>
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem', lineHeight: 1.2 }}>
            {item.name}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: 'var(--text-secondary)',
            fontSize: '0.85rem',
            lineHeight: 1.45,
            mb: 2.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            height: '2.9em'
          }}
        >
          {item.dsc}
        </Typography>
        <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 500 }}>
              Ціна: <span style={{ color: '#fff', fontWeight: 700 }}>{item.price} ₴</span>
            </Typography>

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.04)',
              borderRadius: '10px',
              p: '1px 4px'
            }}>
              <IconButton size="small" onClick={handleDecrement} sx={{ color: 'var(--text-secondary)', p: 0.4 }}>
                <Remove sx={{ fontSize: '14px' }} />
              </IconButton>
              <Typography sx={{ mx: 1, fontWeight: 700, color: '#fff', fontSize: '0.85rem', minWidth: '14px', textAlign: 'center' }}>
                {quantity}
              </Typography>
              <IconButton size="small" onClick={handleIncrement} sx={{ color: 'var(--text-secondary)', p: 0.4 }}>
                <Add sx={{ fontSize: '14px' }} />
              </IconButton>
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={handleAddToCart}
            startIcon={<ShoppingCartIcon sx={{ fontSize: '18px !important' }} />}
            sx={{
              backgroundColor: 'var(--primary)',
              color: '#fff',
              borderRadius: '16px',
              textTransform: 'none',
              px: 2.5, py: 1.3,
              fontWeight: 800,
              fontSize: '0.9rem',
              boxShadow: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'var(--btn-hover)',
                transform: 'scale(1.03)',
                boxShadow: '0 8px 20px rgba(255, 122, 24, 0.25)'
              }
            }}
          >
            {productPrice.toFixed(2)} ₴
          </Button>

        </Box>
      </CardContent>
    </Card>
  );
};

export { MenuCard };
import React, { useState, useMemo } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { LocationCity, Remove, Add } from '@mui/icons-material';
import {
  Card, CardMedia, CardContent, Typography, Box, Chip, Button, IconButton
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { useCart } from '../../context/CartContext';

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
  "Фотограф пішов за добавкою і не повернувся 🚶‍♂️",
  "Це секретна розробка, фото заборонені 🤫",
  "Уявіть щось неймовірне. Це воно! ✨",
  "Ми намагалися сфотографувати, але аромат збив нас з ніг 💨"
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

  const productPrice = quantity * item.price

  return (
    <Card sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--bg-cards)',
      border: '1px solid var(--borders)',
      borderRadius: '20px',
      overflow: 'hidden',
      position: 'relative',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-8px)',
        borderColor: 'var(--accent)',
        boxShadow: '0 12px 24px rgba(46, 211, 183, 0.15)'
      }
    }}>
      <Box sx={{ position: 'relative', height: 200, display: 'flex' }}>
        {!imgError && item.img ? (
          <CardMedia
            component="img"
            height="200"
            image={item.img}
            alt={item.name}
            sx={{ objectFit: 'cover' }}
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
            textAlign: 'center',
            background: `linear-gradient(135deg, var(--bg-cards) 0%, var(--borders) 100%)`,
            borderBottom: '1px solid var(--borders)',
            color: 'var(--text-secondary)',
          }}>
            <FastfoodIcon sx={{ fontSize: 40, mb: 1, color: 'var(--primary)', opacity: 0.8 }} />
            <Typography variant="body2" sx={{
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              lineHeight: 1.4
            }}>
              {randomText}
            </Typography>
          </Box>
        )}

        <Chip
          icon={<StarIcon sx={{ '&&': { color: '#FFD700' }, fontSize: '16px' }} />}
          label={item.rate}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: 'rgba(18, 18, 18, 0.7)',
            color: '#fff',
            backdropFilter: 'blur(8px)',
            fontWeight: 'bold',
            '& .MuiChip-icon': { marginLeft: '8px' }
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" sx={{ color: 'var(--text-primary)', fontWeight: 700, lineHeight: 1.2 }}>
            {item.name}
          </Typography>
          <Typography variant="h6" sx={{ color: 'var(--accent)', fontWeight: 800, ml: 1 }}>
            {item.price}₴
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" sx={{ color: 'var(--text-secondary)', flexGrow: 1 }}>
            {item.dsc}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <LocationCity sx={{ color: 'var(--accent)', fontSize: '18px' }} />
            <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
              {item.country}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: "space-between", alignItems: 'center', gap: '15px' }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bg)',
            borderRadius: '12px',
            border: '1px solid var(--borders)',
            p: 0.5
          }}>
            <IconButton size="small" onClick={handleDecrement} sx={{ color: 'var(--text-primary)' }}>
              <Remove fontSize="small" />
            </IconButton>

            <Typography sx={{ mx: 2, fontWeight: 700, color: 'var(--text-primary)', minWidth: '20px', textAlign: 'center' }}>
              {quantity}
            </Typography>

            <IconButton size="small" onClick={handleIncrement} sx={{ color: 'var(--text-primary)' }}>
              <Add fontSize="small" />
            </IconButton>
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={handleAddToCart}
            startIcon={<ShoppingCartIcon />}
            sx={{
              backgroundColor: 'var(--primary)',
              borderRadius: '12px',
              textTransform: 'none',
              py: 1.2,
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(255, 122, 24, 0.2)',
              '&:hover': {
                backgroundColor: 'var(--btn-hover)',
                boxShadow: '0 6px 16px rgba(255, 122, 24, 0.3)'
              }
            }}
          >
            {productPrice.toFixed(2)}₴
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export { MenuCard };
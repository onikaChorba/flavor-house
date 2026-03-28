import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import LocationIcon from '@mui/icons-material/LocationCity';
import {
  Card, CardMedia, CardContent, Typography, Box, Chip, Button
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
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
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={item.img}
          alt={item.name}
          sx={{ objectFit: 'cover' }}
        />
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

        <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 3, flexGrow: 1 }}>
          {item.dsc}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <LocationIcon sx={{ color: 'var(--accent)', fontSize: '18px' }} />
            <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
              {item.country}
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            startIcon={<ShoppingCartIcon />}
            sx={{
              backgroundColor: 'var(--primary)',
              borderRadius: '10px',
              textTransform: 'none',
              '&:hover': { backgroundColor: 'var(--btn-hover)' }
            }}
          >
            Додати
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export { MenuCard };
import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Box, CircularProgress, Fade
} from '@mui/material';
import { MenuCard } from '../components';

interface MenuItem {
  id: string;
  img: string;
  name: string;
  dsc: string;
  price: number;
  rate: number;
  country: string;
}

const Menu: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://free-food-menus-api-two.vercel.app/all')
      .then(res => res.json())
      .then((data) => {
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          const allItems = Object.values(data).flat() as MenuItem[];
          setItems(allItems);
        } else if (Array.isArray(data)) {
          setItems(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress sx={{ color: 'var(--primary)' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" sx={{ color: 'var(--text-primary)', fontWeight: 800 }}>
          Наше <span style={{ color: 'var(--primary)' }}>Меню</span>
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        justifyContent: 'center'
      }}>
        {items.map((item, index) => (
          <Fade in={true} timeout={300 + index * 50} key={`${item.id}-${index}`}>
            <Box sx={{
              width: {
                xs: '100%',
                sm: 'calc(50% - 12px)',
                md: 'calc(33.333% - 16px)'
              }
            }}>
              <MenuCard item={item} />
            </Box>
          </Fade>
        ))}
      </Box>
    </Container>
  );
};

export { Menu };
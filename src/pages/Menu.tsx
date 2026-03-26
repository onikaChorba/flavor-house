import React, { useEffect, useState, useMemo } from 'react';
import {
  Container, Typography, Box, CircularProgress, Fade, InputAdornment, TextField, Tabs, Tab
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
  const [items, setItems] = useState<Record<string, MenuItem[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    fetch('https://free-food-menus-api-two.vercel.app/all')
      .then(res => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => ['all', ...Object.keys(items)], [items]);

  const filteredItems = useMemo(() => {
    let list: MenuItem[] = [];

    if (activeTab === 'all') {
      list = Object.values(items).flat();
    } else {
      list = items[activeTab] || [];
    }

    if (searchQuery) {
      list = list.filter(item => {
        const name = item.name ? item.name.toLowerCase() : '';
        const dsc = item.dsc ? item.dsc.toLowerCase() : '';
        const query = searchQuery.toLowerCase();

        return name.includes(query) || dsc.includes(query);
      });
    }

    return Array.from(new Map(list.filter(item => item && item.id).map(item => [item.id, item])).values());
  }, [items, activeTab, searchQuery]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress sx={{ color: 'var(--primary)' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
        <Typography variant="h3" sx={{ color: 'var(--text-primary)', fontWeight: 800 }}>
          Наше <span style={{ color: 'var(--primary)' }}>Меню</span>
        </Typography>

        <Container maxWidth="lg">
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': { backgroundColor: 'var(--primary)' },
              '& .MuiTab-root': {
                color: 'var(--text-secondary)',
                textTransform: 'capitalize',
                '&.Mui-selected': { color: 'var(--primary)' }
              }
            }}
          >
            {categories.map((cat) => (
              <Tab key={cat} label={cat === 'all' ? 'Всі' : cat} value={cat} />
            ))}
          </Tabs>
        </Container>

        <TextField
          fullWidth
          placeholder="Пошук улюбленої страви..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            maxWidth: '100%',
            backgroundColor: 'var(--bg-cards)',
            borderRadius: '12px',
            '& .MuiOutlinedInput-root': {
              color: 'var(--text-primary)',
              '& fieldset': { borderColor: 'var(--borders)' },
              '&:hover fieldset': { borderColor: 'var(--primary)' },
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'var(--text-secondary)' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        justifyContent: 'center',
      }}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <Fade in={true} timeout={200} key={`${item.id}-${index}`}>
              <Box sx={{
                width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' }
              }}>
                <MenuCard item={item} />
              </Box>
            </Fade>
          ))
        ) : (
          <Typography sx={{ color: 'var(--text-secondary)', mt: 4 }}>
            Нічого не знайдено за вашим запитом 🍕
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export { Menu };
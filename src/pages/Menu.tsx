import React, { useEffect, useState, useMemo } from 'react';
import {
  Container, Typography, Box, CircularProgress, Fade, InputAdornment, TextField, Tabs, Tab, MenuItem as MuiMenuItem, FormControl, Select, Pagination
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
  const [sortBy, setSortBy] = useState<string>('default');
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

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

  useEffect(() => {
    setPage(1);
  }, [searchQuery, activeTab, sortBy]);

  const categories = useMemo(() => ['all', ...Object.keys(items)], [items]);

  const filteredItems = useMemo(() => {
    let list: MenuItem[] = [];

    if (activeTab === 'all') {
      list = Object.values(items).flat();
    } else {
      list = items[activeTab] || [];
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      list = list.filter(item =>
        (item.name?.toLowerCase() || '').includes(query) ||
        (item.dsc?.toLowerCase() || '').includes(query)
      );
    }
    let uniqueList = Array.from(new Map(list.filter(i => i?.id).map(item => [item.id, item])).values());

    return uniqueList.sort((a, b) => {
      if (sortBy === 'rate') return b.rate - a.rate;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
      return 0;
    });
  }, [items, activeTab, searchQuery, sortBy]);

  const count = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const begin = (page - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return filteredItems.slice(begin, end);
  }, [page, filteredItems]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        <Box sx={{
          display: "flex",
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          width: '100%',
          maxWidth: '800px',
          justifyContent: 'center'
        }}>
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

          <FormControl sx={{ minWidth: { xs: '100%', md: '200px' } }}>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              displayEmpty
              sx={{
                backgroundColor: 'var(--bg-cards)',
                color: 'var(--text-primary)',
                borderRadius: '12px',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--borders)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--primary)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--accent)' },
                '& .MuiSvgIcon-root': { color: 'var(--text-secondary)' }
              }}
            >
              <MuiMenuItem value="default">За замовчуванням</MuiMenuItem>
              <MuiMenuItem value="rate">За рейтингом </MuiMenuItem>
              <MuiMenuItem value="price-low">Найдешевші </MuiMenuItem>
              <MuiMenuItem value="price-high">Найдорожчі </MuiMenuItem>
              <MuiMenuItem value="name">За назвою (А-Я)</MuiMenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        justifyContent: 'center',
      }}>
        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
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

      {count > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <Pagination
            count={count}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'var(--text-primary)',
                borderColor: 'var(--borders)',
                '&.Mui-selected': {
                  backgroundColor: 'var(--primary)',
                  color: '#fff',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 122, 24, 0.1)',
                }
              }
            }}
          />
        </Box>
      )}
    </Container>
  );
};

export { Menu };
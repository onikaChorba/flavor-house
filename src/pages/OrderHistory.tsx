import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import { useAuth, useCart } from '../context';
import { Box, Typography, Card, CardContent, CircularProgress, Divider, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RestaurantMenu, AccessTime, LocalMall, Replay } from '@mui/icons-material';

interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  createdAt: Timestamp | null;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'completed' | 'canceled' | string;
  address: string;
  deliveryMethod: 'delivery' | 'pickup';
}

const OrderHistory = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const db = getFirestore();
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const fetchedOrders: Order[] = [];

        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() } as Order);
        });

        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Помилка завантаження історії:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleReorder = (items: OrderItem[]) => {
    if (!items || items.length === 0) return;
    items.forEach(item => {
      addToCart({
        id: String(item.id),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        description: "",
        image: ""
      });
    });
  };

  const renderStatus = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Chip label="⏳ Очікує" size="small" sx={{ backgroundColor: 'rgba(255, 152, 0, 0.15)', color: '#ff9800', fontWeight: 700, borderRadius: '8px' }} />;
      case 'completed':
        return <Chip label="✅ Виконано" size="small" sx={{ backgroundColor: 'rgba(76, 175, 80, 0.15)', color: '#4cd137', fontWeight: 700, borderRadius: '8px' }} />;
      case 'canceled':
        return <Chip label="❌ Скасовано" size="small" sx={{ backgroundColor: 'rgba(244, 67, 54, 0.15)', color: '#f44336', fontWeight: 700, borderRadius: '8px' }} />;
      default:
        return <Chip label={status} size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }} />;
    }
  };

  const formatDate = (timestamp: Timestamp | null) => {
    if (!timestamp) return 'Дата невідома';
    return timestamp.toDate().toLocaleString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return (
      <Box sx={{ textAlign: 'center', mt: 8, p: 3 }}>
        <Typography sx={{ color: 'var(--text-secondary)', mb: 2, fontSize: '1.1rem' }}>
          Увійдіть в акаунт, щоб переглянути історію замовлень 🔑
        </Typography>
        <Button variant="contained" onClick={() => navigate('/login')} sx={{ backgroundColor: 'var(--primary)', textTransform: 'none', borderRadius: '10px' }}>
          Увійти
        </Button>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '300px', gap: 2 }}>
        <CircularProgress sx={{ color: 'var(--primary)' }} />
        <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>Завантажуємо смачну історію...</Typography>
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 8, px: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <LocalMall sx={{ fontSize: '64px', color: 'rgba(255,255,255,0.15)' }} />
        <Typography sx={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: 600 }}>
          Ви ще нічого не замовляли. 🍕
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', maxWidth: '280px', mb: 1, lineHeight: 1.4 }}>
          Твоя історія поки що порожня. Перейди до меню та обери щось смачненьке!
        </Typography>
        <Button
          variant="outlined"
          startIcon={<RestaurantMenu />}
          onClick={() => navigate('/')}
          sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)', textTransform: 'none', borderRadius: '12px', '&:hover': { borderColor: '#fff' } }}
        >
          Перейти до меню
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, p: 3, maxWidth: '600px', margin: '0 auto' }}>
      <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800, mb: 0.5, letterSpacing: '-0.5px' }}>
        Історія твоїх замовлень 📜
      </Typography>

      {orders.map((order) => (
        <Card key={order.id} sx={{ backgroundColor: 'rgba(30, 30, 30, 0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', color: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
          <CardContent sx={{ p: '20px !important' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                  Замовлення #{order.id.slice(0, 6).toUpperCase()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5, color: 'rgba(255,255,255,0.4)' }}>
                  <AccessTime sx={{ fontSize: '14px' }} />
                  <Typography variant="caption">
                    {formatDate(order.createdAt)}
                  </Typography>
                </Box>
              </Box>
              {renderStatus(order.status)}
            </Box>

            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 2, fontSize: '0.85rem' }}>
              📍 {order.deliveryMethod === 'pickup' ? 'Самовивіз:' : 'Доставка:'} <span style={{ color: 'rgba(255,255,255,0.75)' }}>{order.address}</span>
            </Typography>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', my: 1.5 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {order.items && order.items.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem' }}>
                    {item.name} <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginLeft: '4px' }}>× {item.quantity}</span>
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>
                    {(item.price * item.quantity).toFixed(2)} ₴
                  </Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', my: 1.5 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block' }}>Сума замовлення:</Typography>
                <Typography variant="h6" sx={{ color: 'var(--accent)', fontWeight: 900, fontSize: '1.2rem' }}>
                  {order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'} ₴
                </Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<Replay />}
                onClick={() => handleReorder(order.items)}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  textTransform: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  px: 2,
                  '&:hover': {
                    backgroundColor: 'var(--primary)',
                  }
                }}
              >
                Повторити
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export { OrderHistory };
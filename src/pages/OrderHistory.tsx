import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { useAuth } from '../context';
import { Box, Typography, Card, CardContent, CircularProgress, Divider } from '@mui/material';

interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  createdAt: any;
  items: OrderItem[];
  totalPrice: number;
  status: string;
  address: string;
}

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (!user) {
    return (
      <Typography sx={{ color: 'var(--text-secondary)', textAlign: 'center', mt: 4 }}>
        Увійдіть в акаунт, щоб переглянути історію замовлень 🔑
      </Typography>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress sx={{ color: 'var(--primary)' }} />
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Typography sx={{ color: 'var(--text-secondary)', textAlign: 'center', mt: 4 }}>
        Ви ще нічого не замовляли. Час скуштувати щось смачненьке! 🍕
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, maxWidth: '600px', margin: '0 auto' }}>
      <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800, mb: 1 }}>
        Історія твоїх замовлень 📜
      </Typography>

      {orders.map((order) => (
        <Card key={order.id} sx={{ backgroundColor: 'var(--bg-cards)', border: '1px solid var(--borders)', borderRadius: '14px', color: '#fff' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                Замовлення #{order.id.slice(0, 6)}...
              </Typography>
              <Typography variant="caption" sx={{
                color: order.status === 'completed' ? '#4cd137' : 'var(--primary)',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}>
                {order.status === 'pending' ? '⏳ Очікує' : '✅ Виконано'}
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1.5 }}>
              Адреса: {order.address}
            </Typography>

            <Divider sx={{ borderColor: 'var(--borders)', my: 1 }} />

            {order.items.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {item.name} <span style={{ color: 'var(--text-secondary)' }}>× {item.quantity}</span>
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {(item.price * item.quantity).toFixed(2)} ₴
                </Typography>
              </Box>
            ))}

            <Divider sx={{ borderColor: 'var(--borders)', my: 1 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5 }}>
              <Typography variant="subtitle2" sx={{ color: 'var(--text-secondary)' }}>Разом:</Typography>
              <Typography variant="h6" sx={{ color: 'var(--accent)', fontWeight: 800 }}>
                {order.totalPrice.toFixed(2)} ₴
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export { OrderHistory };
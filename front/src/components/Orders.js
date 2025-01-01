import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';

function Orders() {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/order', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch orders');
      }
    };
    fetchOrders();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', marginTop: 5 }}>
        Your Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          You have no orders yet. Place an order to see it here.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Order #{order._id}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ marginTop: 2 }}>
                    Total: ${order.totalAmount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                    Status: {order.status}
                  </Typography>

                  <Grid container spacing={2} sx={{ marginTop: 3 }}>
                    {order.items.map((item, index) => (
                      <Grid item xs={12} key={index}>
                        <Typography variant="body2">
                          {item.name} - {item.quantity} x ${item.price}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Orders;

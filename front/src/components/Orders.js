import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Button, Box, CircularProgress } from '@mui/material';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders and menu items
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch orders
        const orderResponse = await axios.get('https://full-stack-food-delivery-app.onrender.com/api/order', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched Orders:', orderResponse.data);  // Log fetched orders

        // Fetch menu items
        const menuResponse = await axios.get('https://full-stack-food-delivery-app.onrender.com/api/menu');
        console.log('Fetched Menu Items:', menuResponse.data);  // Log fetched menu items

        // Set state for orders and menu items
        setOrders(orderResponse.data);
        setMenuItems(menuResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        alert('Failed to fetch orders or menu items');
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ textAlign: 'center', marginTop: 5, fontWeight: 'bold' }}
      >
        Your Orders
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
          <CircularProgress />
        </Box>
      ) : orders.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 5 }}>
          You have no orders yet. Place an order to see it here.
        </Typography>
      ) : (
        <Grid container spacing={4} sx={{ marginTop: 3 }}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    Order #{order._id}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ marginTop: 2, fontWeight: 'bold' }}
                  >
                    Total: ${order.totalAmount?.toFixed(2) || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                    Status: <strong>{order.status}</strong>
                  </Typography>

                  <Box sx={{ marginTop: 3 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Items:
                    </Typography>
                
                    <Grid container spacing={2} sx={{ marginTop: 1 }}>
                      {order.items.map((orderItem, index) => {
                        console.log('Logging orderItem:', orderItem);  // Log the order item to see its structure

                        // Ensure the menuItem exists in the orderItem
                        if (!orderItem.menuItem || !orderItem.menuItem._id) {
                          console.error('Menu item is missing in order item:', orderItem);
                          return null;  // Skip this item if no menuItem exists
                        }

                        // Find the corresponding menu item from the menuItems list using _id
                        const menuItem = menuItems.find(
                          (menu) => menu._id.toString() === orderItem.menuItem._id.toString()
                        );

                        // Log menuItem for debugging
                        if (!menuItem) {
                          console.error('Menu item not found for order item:', orderItem);
                        }

                        return (
                          <Grid item xs={12} key={index}>
                            <Typography variant="body2">
                              {menuItem ? menuItem.name : "Unknown Item"} - {orderItem.quantity} x ${menuItem?.price?.toFixed(2) || 0}
                            </Typography>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                  {order.status === 'Completed' && (
                    <Button variant="contained" color="success" sx={{ marginTop: 2, width: '100%' }}>
                      Reorder
                    </Button>
                  )}
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

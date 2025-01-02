import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Grid, Typography, Box, TextField, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function OrderForm() {
  const [menu, setMenu] = useState([]);
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // Fetch menu items when the component mounts
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('https://full-stack-food-delivery-app.onrender.com/api/menu');
        setMenu(response.data); // Assuming the menu data comes as an array
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };
    fetchMenu();
  }, []);

  const handleAddItem = (item) => {
    const existingItemIndex = items.findIndex(
      (orderItem) => orderItem.menuItem === item._id
    );

    if (existingItemIndex > -1) {
      // If the item already exists in the order, update the quantity
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += quantity;
      setItems(updatedItems);
    } else {
      // If the item does not exist in the order, add it
      setItems([...items, { menuItem: item._id, quantity }]);
    }
    setQuantity(1); // Reset quantity after adding item
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://full-stack-food-delivery-app.onrender.com/api/order',
        { items },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Order placed successfully');
      setItems([]); 
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };

  return (
    <div className="order-form">
      <h2>Create Order</h2>
      <div className="menu-list">
        {menu.length === 0 ? (
          <p>Loading menu...</p>
        ) : (
          menu.map((item) => (
            <div key={item._id} className="menu-item">
              <Card sx={{ maxWidth: 345, margin: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5">{item.name}</Typography>
                  <Typography variant="body2">{item.description}</Typography>
                  <Typography variant="h6" color="primary">${item.price}</Typography>
                  <div className="quantity-selector">
                    <label>Quantity: </label>
                    <TextField
                      type="number"
                      value={quantity}
                      min="1"
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      sx={{ marginTop: 2 }}
                    />
                  </div>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleAddItem(item)}
                    sx={{ marginTop: 2 }}
                  >
                    Add to Order
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>

      <div className="order-summary">
        <h3>Your Order:</h3>
        <ul>
          {items.map((orderItem, index) => (
            <li key={index}>
              {menu.find((item) => item._id === orderItem.menuItem)?.name} -{' '}
              {orderItem.quantity} x ${menu.find((item) => item._id === orderItem.menuItem)?.price}
            </li>
          ))}
        </ul>

        <Box sx={{ marginTop: 3 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/orders')}
              >
                View Your Orders
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmitOrder}
              >
                Place Order
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default OrderForm;

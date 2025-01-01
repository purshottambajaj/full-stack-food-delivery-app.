import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardActions, Button, Grid, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch menu items');
      }
    };
    fetchMenu();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', marginTop: 5 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Explore Our Menu
        </Typography>
        <Typography variant="h6" paragraph>
          Choose from a variety of delicious items. Click on "Order Now" to start your order.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {menuItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ marginTop: 2 }}>
                    ${item.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => navigate('/order')}
                  >
                    Order Now
                  </Button>
                
    </Container>
  );
}

export default Menu;

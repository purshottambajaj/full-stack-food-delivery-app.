import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardActions, Button, Grid, Typography, Container, Box, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', category: '', price: '', });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('https://full-stack-food-delivery-app.onrender.com/api/menu');
        console.log('Fetched menu items:', response.data); 
        setMenuItems(response.data);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch menu items');
      }
    };
    fetchMenu();
  }, []);

  // Handle Add New Item
  const handleAddItem = async () => {
    try {
      const response = await axios.post('https://full-stack-food-delivery-app.onrender.com/api/menu', newItem);
      setMenuItems([...menuItems, newItem]);
      setNewItem({ name: '', category: '', price: '' });
      setOpenDialog(false); 
      window.location.reload();} catch (error) {
      console.error(error);
      alert('Failed to add menu item');
    }
  };

  // Handle Update Item
  const handleUpdateItem = async (id) => {
    console.log('Updating item with ID:', id); 
        if (!id) {
      console.error("Item ID is missing!");
      return;
    }
    try {
      const updatedItem = await axios.put(`https://full-stack-food-delivery-app.onrender.com/api/menu/${id}`, selectedItem);
      setMenuItems(menuItems.map(item => (item.id === id ? updatedItem.data : item)));
      setOpenDialog(false); 
      window.location.reload();
        } catch (error) {
      console.error(error);
      alert('Failed to update menu item');
    }
  };

  // Handle Delete Item
  const handleDeleteItem = async (id) => {
    console.log('Deleting item with ID:', id); 
        if (!id) {
      console.error("Item ID is missing!");
      return;
    }
    try {
      await axios.delete(`https://full-stack-food-delivery-app.onrender.com/api/menu/${id}`);
      setMenuItems(menuItems.filter(item => item.id !== id));
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Failed to delete menu item');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', marginTop: 5 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Explore Our Menu
        </Typography>
        <Typography variant="h6" paragraph>
          Choose from a variety of delicious items. Click on "Order Now" to start your order.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 4 }}
          onClick={() => setOpenDialog(true)}
        >
          Add a New Menu Item
        </Button>

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
                  <IconButton onClick={() => { setSelectedItem(item); setOpenDialog(true); }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteItem(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Dialog for Adding/Editing Menu Items */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{selectedItem ? 'Update Menu Item' : 'Add Menu Item'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem ? selectedItem.name : newItem.name}
            onChange={(e) => selectedItem ? setSelectedItem({ ...selectedItem, name: e.target.value }) : setNewItem({ ...newItem, name: e.target.value })}
          />
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem ? selectedItem.category : newItem.category}
            onChange={(e) => selectedItem ? setSelectedItem({ ...selectedItem, category: e.target.value }) : setNewItem({ ...newItem, category: e.target.value })}
          />
          <TextField
            label="Price"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedItem ? selectedItem.price : newItem.price}
            onChange={(e) => selectedItem ? setSelectedItem({ ...selectedItem, price: e.target.value }) : setNewItem({ ...newItem, price: e.target.value })}
          /> All field are mandatory 
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => selectedItem ? handleUpdateItem(selectedItem.id) : handleAddItem()}
            color="primary"
          >
            {selectedItem ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={() => navigate('/order')}
      >
        Order Now
      </Button>
      <Button
          variant="outlined"
           color="primary"
           onClick={() => navigate('/orders')}
                    >
                      View Your Orders
                    </Button>
    </Container>
  );
}

export default Menu;

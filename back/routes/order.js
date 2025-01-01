const express = require('express');
const Order = require('../models/Order');
const Menu = require('../models/Menu');
const authMiddleware = require('../middleware/auth');
const router = express.Router();


router.post('/', authMiddleware, async (req, res) => {
  const { items } = req.body;  
  const userId = req.user.id; 

  if (!items) return res.status(400).send('Missing items in the order');

  try {
    let totalAmount = 0;
    for (let item of items) {
      const menuItem = await Menu.findById(item.menuItem);
      if (menuItem) {
        totalAmount += menuItem.price * item.quantity;
      } else {
        return res.status(400).send('Invalid menu item');
      }
    }

    const newOrder = new Order({ userId, items, totalAmount });
    await newOrder.save();
    res.status(201).send('Order placed successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


router.get('/', authMiddleware, async (req, res) => {
  try {
    // User data will be available in req.user after JWT verification
    if (!req.user || !req.user.id) {
      return res.status(400).send('User data not available.');
    }
    
    const orders = await Order.find({ userId: req.user.id }).populate('items.menuItem');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Server error');
  }
});


module.exports = router;

const express = require('express');
const Menu = require('../models/Menu');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).send('Server error');
  }
});


router.post('/', async (req, res) => {
  const { name, category, price } = req.body;
  if (!name || !category || !price) return res.status(400).send('Missing fields');
  try {
    const newItem = new Menu({ name, category, price });
    await newItem.save();
    res.status(201).send('Menu item added');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).send('Server error');
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.send('Menu item deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

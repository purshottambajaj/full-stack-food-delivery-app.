const express = require('express');
const Menu = require('../models/Menu');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const menuItems = await Menu.find().sort({ id: -1 }); 
    res.json(menuItems);
  } catch (error) {
    res.status(500).send('Server error');
  }
});


router.post('/', async (req, res) => {
  const { name, category, price } = req.body;
  if (!name || !category || !price) return res.status(400).send('Missing fields');

  try {

    const lastItem = await Menu.findOne().sort({ id: -1 });
    const newId = lastItem ? lastItem.id + 1 : 101; 

    const newItem = new Menu({ 
      id: newId,
      name, 
      category, 
      price
    });
    await newItem.save();
    res.status(201).send('Menu item added');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Menu.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Menu.findOneAndDelete({ id: req.params.id });
    res.send('Menu item deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

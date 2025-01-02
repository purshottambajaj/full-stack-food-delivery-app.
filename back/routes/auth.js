const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming your User model is in 'models/User'
const generateToken = require('../middleware/generateToken'); // Import the JWT middleware
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Missing fields');
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();
    res.status(201).send('User registered');
  } catch (error) {
    console.error('Registration error:', error); 
    res.status(500).send('Server error');
  }
});

// Login Route
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Missing fields');
  }

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }

    console.log('Stored Hash:', user.password);
    console.log('Entered Password:', password);

   if(password=== user.password)
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    req.user = user;

    next();
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).send('Server error');
  }
}, generateToken); 

module.exports = router;

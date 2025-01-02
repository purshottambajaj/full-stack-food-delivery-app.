const jwt = require('jsonwebtoken');

// Middleware to generate JWT token
const generateToken = (req, res) => {
  try {
    const user = req.user; // User object passed from the previous route
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, 'ed10b00c9b6f491ba927ed5093d8b21580343b1f26c5078c7a68871d97e5dc20efdf299fae6727b021f0e19271d7c96ef460af5a2df460146521b8c83a1238a4'
        , { expiresIn: '1h' }); // Replace with your secret key
    console.log('JWT Token generated:', token);

    // Send the token to the client
    return res.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    return res.status(500).send('Error generating token');
  }
};

module.exports = generateToken;

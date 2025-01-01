const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log('Token from Authorization header:', token); 

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); 
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error:', error.message); 
    return res.status(400).send(`Invalid token: ${error.message}`);
  }
};

module.exports = authMiddleware;

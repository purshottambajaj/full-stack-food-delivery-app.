const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; 
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, 'ed10b00c9b6f491ba927ed5093d8b21580343b1f26c5078c7a68871d97e5dc20efdf299fae6727b021f0e19271d7c96ef460af5a2df460146521b8c83a1238a4'
    ); 
        req.user = decoded;
           next(); 
  } catch (error) {
    console.error('Invalid token:', error.message);
    return res.status(400).send('Invalid token');
  }
};

module.exports = authMiddleware;

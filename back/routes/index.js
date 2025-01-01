const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');


router.use('/auth', authRoutes);

router.use('/menu', require('./menu'));
router.use('/order', require('./order'));

module.exports = router;

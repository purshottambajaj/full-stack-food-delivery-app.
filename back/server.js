require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const order = require('./routes/order');
const cors = require('cors');

const authMiddleware = require('./middleware/auth');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


const mongoURI = "mongodb+srv://purshottambajaj75:aYTq8MrAbo5DYeJw@cluster0.z4h8n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connetion error:", err));


app.use('/api', require('./routes'));

app.use('/api/order', authMiddleware, order); 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
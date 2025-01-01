import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register';
import Login from './components/Login';
import Menu from './components/Menu';
import Orders from './components/Orders';
import OrderForm from './components/OrderForm';
import Landing from './components/Landing'; // Import the Landing Page

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} /> {/* Add Landing Route */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order" element={<OrderForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

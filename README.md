# full-stack-food-delivery-app.

A full-stack food delivery system with a **Node.js backend** and a **React frontend**. This project includes features such as user authentication, menu management, and order placement, providing a seamless experience for both customers and administrators.

---

## 🚀 Features

### Backend:
- **Authentication**: User registration and login with JWT-based authentication.
- **Menu Management**: Add, update, delete, and fetch menu items.
- **Order Management**: Place and view orders linked to specific users.
- **Secure API**: Middleware for token-based user authentication.

### Frontend:
- **User-Friendly UI**: Forms for registration, login, and order placement.
- **Dynamic Menu Display**: Fetches menu items from the backend.
- **Order Details**: Allows users to view their past orders.
- **State Management**: Manages authentication tokens and user state efficiently.

---

## 📂 Project Structure

### Backend (`/backend`)
- **auth.js**: Routes for user registration and login.
- **menu.js**: Routes for menu item CRUD operations.
- **order.js**: Routes for order placement and viewing.
- **Middleware**: Handles JWT-based user authentication.
- **Models**: MongoDB models for `User`, `Menu`, and `Order`.

### Frontend (`/frontend`)
- **Register**: User registration form.
- **Login**: User login form with token storage.
- **Menu**: Displays the menu fetched from the backend.
- **Order Form**: Allows users to place orders.
- **Orders**: Displays a list of user orders.

---

## 🛠️ Technologies Used

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Bcrypt.js** for password hashing

### Frontend:
- **React**
- **React Router** for routing
- **Axios** for API communication
- **Material-ui** for styling
---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance running (local or cloud)

### Backend Setup
- Navigate to the `back` directory:
   ```bash
  cd back
  npm install
  node server.js   -to start the server 

### Backend Setup
- Navigate to the `front` directory:
   ```bash
  cd front
  npm install
  npm start   -to start the app
   
  
     
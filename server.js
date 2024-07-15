const express = require('express');
const { connectDB } = require('./db');
const cors = require('cors'); 
const User_Router = require('./Routes/User_routes');
const { Train_Route } = require('./Routes/Train_routes');
require('dotenv').config();
const cookieparser = require('cookie-parser')
const app = express();
const allowedOrigins = [
    'https://localhost:5173',
    'https://another-allowed-origin.com', // Add more origins as needed
  ];
  
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin); // Allow the request
      } else {
        callback(new Error('Not allowed by CORS')); // Reject the request
      }
    },
    credentials: true,
  }));
app.use(express.json());
app.use(cookieparser())

// Use the User Router for the /user route
app.use('/user', User_Router);
// Use the Train TRouter for the /train route
app.use('/train',Train_Route)
// Basic route to test the server
app.get('/', (req, res) => {
    res.send('Hi, your Railway server is running');
});

// Start the server and connect to the database
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});


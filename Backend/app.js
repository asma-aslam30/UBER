const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');

// Connect to database
connectToDb();

// 👇 CORS configuration with your deployed frontend URL
const corsOptions = {
    origin: 'https://uber-zfn2-git-master-asma-aslam30s-projects.vercel.app',
    credentials: true
};

// Middleware setup
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// API routes
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

module.exports = app;

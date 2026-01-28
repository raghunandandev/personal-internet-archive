require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const passport = require('passport');
require('./config/passport');
// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json({ limit: '50mb' })); // Increased limit for screenshots
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // Logging
app.use(passport.initialize());

// Placeholder Routes (We will create these files next)
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/pages', require('./routes/pages.routes'));

app.get('/', (req, res) => {
    res.send('Personal Internet Archive API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
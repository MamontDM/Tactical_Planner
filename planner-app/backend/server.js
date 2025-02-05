require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const session = require('express-session');


const app_id = process.env.APP_ID;

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

const isProduction = ENV === "production";

const mongoUri = isProduction 
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV;

const sessionSecret = process.env.SESSION_SECRET;

const corsOrigin = process.env.CORS_ORIGIN;

if (!app_id || !mongoUri || !sessionSecret || !PORT || !corsOrigin) {
    throw new Error("Missing required environment variables. Check your .env file.");
}

module.exports = { app_id };
const requestFromDB = require('./routes/InternalApi/requestFromDB');
const authRoutes = require('./routes/AuthApi/authRoutes')
const playerProfile = require('./routes/ExternalWGApi/userDataFromWG')

const app = express();
app.use(cors({
    origin: corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(session({
    secret: sessionSecret,
    resave: false,            
    saveUninitialized: false, 
    cookie: {
        secure: isProduction,        
        maxAge: 3600000,     
    },
}));

mongoose
    .connect(mongoUri)
    .then(() => console.log(`Connected to ${mongoUri}`))
    .catch((err) => console.error("Error connecting to MongoDB:", err));


app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.url}`);
    next();
});


app.use('/api', requestFromDB);
app.use('/auth', authRoutes);
app.use('/profile', playerProfile);

app.listen(PORT, () => {
    console.log(`Server running in ${ENV} mode on port ${PORT}`);
});
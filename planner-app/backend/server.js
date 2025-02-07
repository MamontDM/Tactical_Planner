require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const config = require('./config');
const { app_id, mongoUri, sessionSecret, PORT, isProduction, prodFrontOrigins, devServOrigins} = config;

require("./services/redisClient");

const allowedOrigins = isProduction ? prodFrontOrigins : devServOrigins;


console.log(prodFrontOrigins);

if (!app_id || !mongoUri || !sessionSecret || !PORT) {
    throw new Error("Missing required environment variables. Check your .env file.");
}

const requestFromDB = require('./routes/InternalApi/requestFromDB');
const authRoutes = require('./routes/AuthApi/authRoutes')
const playerProfile = require('./routes/ExternalWGApi/userDataFromWG')

const app = express();

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.json());

mongoose
    .connect(mongoUri)
    .then(() => console.log(`Connected to DB!`))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.url}`);
    next();
});


app.use('/api', requestFromDB);
app.use('/auth', authRoutes);
app.use('/profile', playerProfile);

app.listen(PORT, () => {
    console.log(`Server running in ${isProduction ? 'pdoruction' : 'development'} mode on port ${PORT}`);
});
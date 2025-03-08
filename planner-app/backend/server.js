require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const config = require('./config');

const { app_id, mongoUri, sessionSecret, PORT, isProduction, prodFrontOrigins, devFrontOrigins} = config;

require("./services/redisClient");

const allowedOrigins = isProduction ? prodFrontOrigins : devFrontOrigins;

 
if (!app_id || !mongoUri || !sessionSecret || !PORT) {
    throw new Error("Missing required environment variables. Check your .env file.");
}

const requestToDB = require('./routes/InternalApi/internalRouteApi');
const authRoutes = require('./routes/AuthApi/authRoutes')
const externalPlayerProfile = require('./routes/ExternalWGApi/userDataFromWG')


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
    .then(() => { 
        console.log(`Connected to DB!`);
        console.log(mongoUri);
        setInterval(async () => {
            try {
                await mongoose.connection.db.admin().ping();
                console.log("Mongo keepAlive request seuccessfull");
            } catch (error) {
                console.error(" Something go wrong - keepAlive" ,error)
            }
        }, 5 * 60 * 1000);
    })
    .catch((err) => console.error("Error connecting to MongoDB:", err));



app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.url}`);
    next();
});


app.use('/api', requestToDB);
app.use('/auth', authRoutes);




app.listen(PORT, () => {
    console.log(`Server running in ${isProduction ? 'pdoruction' : 'development'} mode on port ${PORT}`);
});
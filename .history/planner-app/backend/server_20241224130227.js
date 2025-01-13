const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');

const shipRoutes = require('./routes/ShipListFromWG');

const app = express();
const PORT = 5000;



mongoose
    .connect("mongodb://localhost:27017/ShipsDB")
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error("Error connecting to MongoDB:", err));




app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.url}`);
    next();
});
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use('/api', shipRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http:/localhost:${PORT}`);
});
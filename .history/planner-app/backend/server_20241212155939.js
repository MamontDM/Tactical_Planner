const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { getShipData } = require('./controllers/shipDataController');

const shipRoutes = require('./routes/ShipFetch').router;

const app = express();
const PORT = 5000;



mongoose
    .connect("mongodb://localhost:27017/ShipDB")
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error("Error connecting to MongoDB:", err));




app.use(bodyParser.json());
app.use(cors());
app.use('/api/ships', shipRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http:/localhost:${PORT}`);
});
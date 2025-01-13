const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { getWgData } = require('./routes/ShipFetch');



const app = express();
const PORT = 5000;



mongoose
    .connect("mongodb://localhost:27017/ShipDB")
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

    app.get('/api/ships', async (req, res) => {
        try {
            const shipData = await getShipData();
            res.json(shipData); // Возвращаем данные клиенту
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при получении данных о кораблях' });
        }
    });

const shipSchema = new mongoose.Schema({
    name: String,
    level: Number,
    nation: { name: String, icon: String },
    class: { name: String, icon: String },
});

const Ship = mongoose.model("Ship", shipSchema);

app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on http:/localhost:${PORT}`);
});
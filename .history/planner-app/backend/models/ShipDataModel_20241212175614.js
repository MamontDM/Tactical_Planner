const mongoose = require('mongoose');


const shipSchema = new mongoose.Schema({
    id: Number,
    name: String,
    tier: Number,
    nation: String,
    class: String,
    images: String,
});

const Ship = mongoose.model("Ship", shipSchema);

module.exports = Ship;
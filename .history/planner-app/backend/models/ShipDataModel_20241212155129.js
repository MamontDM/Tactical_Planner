const mongoose = require('mongoose');


const shipSchema = new mongoose.Schema({
    id: Number,
    name: String,
    level: Number,
    nation: { name: String, icon: String },
    class: { name: String, icon: String },
});

const Ship = mongoose.model("Ship", shipSchema);

module.exports = Ship;
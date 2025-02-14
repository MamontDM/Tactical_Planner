const mongoose = require('mongoose');


const mapSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", require: true},
    title: {type: String, require: true},
    data: {type: Object, require: true},
    createdAt: {type: Date, default: Date.now }
});

module.exports = mongoose.model("Map", mapSchema);
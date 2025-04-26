const mongoose = require('mongoose');


const mapSchema = new mongoose.Schema({
    userExternalId: {type: String, require: true},
    id: {type: String, require: true},
    activeMap: {type: String, require: true},
    name: {type: String, require: true},
    objects: {type: Object, require: true},
    mapData: {type: Object, require: true},
    size: {type: Number, require: true},
    url:  {type: String, require: true},
    value: {type: Number, rquire: true},
    miniImg: {type: String, require: true},
    createdAt: {type: Date, default: Date.now },
});

module.exports = mongoose.model("Map", mapSchema);
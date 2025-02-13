const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    id: {type: String, required: true },
    name: {type: String, required: true },
    clanTag: {type: String, required: true },
    role: {type: String, required: true },
    battles: {type: Number, required: true },
    wins: {type: Number, required: true },
    losses: {type: Number, required: true },
    frags: {type: Number, required: true },
    survived_battles: {type: Number, required: true },
    damage_dealt: {type: Number, required: true },
    max_damage_dealt: {type: Number, required: true },
    max_plane_killed: {type: Number, required: true },
    maps: [{type: mongoose.Schema.Types.ObjectId, ref: "Map" }]
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
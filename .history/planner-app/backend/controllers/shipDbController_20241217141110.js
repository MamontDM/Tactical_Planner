const Ship = require('../models/ShipDataModel');

const getShipById = async (req, res) =>{ 
    try {
        const { name } = req.query;
        console.log(name);
        if(!name){
            res.status(400).json({error: "Name is required"});
        }
        const ship = await Ship.find({name: new RegExp(name, 'i')});
        console.log(ship);
        res.json(ship);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

const getAllShipNames = async (req, res) =>{ 
    try {
        const shipNames = await Ship.find({}, 'id name');
        return shipNames;
    }catch(err){
        console.error('Error fetching ship names:', error.message);
        throw error;
    }
};

module.exports = { getShipById, getAllShipNames};


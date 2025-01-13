const Ship = require('../models/ShipDataModel');

const getShipById = async (req, res) =>{ 
    try {
        console.log(`called`);
        const { id } = req.query;
        if(!id){
            res.status(400).json({error: "Name is required"});
        }
        const ship = await Ship.findById(id);
        res.json(ship);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

const getAllShipNames = async (req, res) =>{ 
    try {
        const shipNames = await Ship.find({}, 'id name');
        return res.json(shipNames);
    }catch(err){
        console.error('Error fetching ship names:', error.message);
        throw error;
    }
};


module.exports = { getShipById, getAllShipNames};


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

const getAllNames = async (req, res) =>{ 
    try {
        if(!req){
            res.status(400).json({error: "List of ships Names"});
        }
        const ship = await Ship.find({name: new RegExp(name, 'i')});
        res.json(shipNames);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

module.exports = { getShipById, getAllNames};


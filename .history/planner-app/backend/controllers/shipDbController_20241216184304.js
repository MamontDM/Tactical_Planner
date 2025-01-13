const Ship = require('../models/ShipDataModel');

const getShipByName = async (req, res) =>{ 
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

module.exports = { getShipByName};
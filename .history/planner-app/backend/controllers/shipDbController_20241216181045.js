const Ship = require('../models/ShipDataModel');

exports.getShipbyName = async (req, res) =>{ 
    try {
        const { name } = req.query.name;
        if(!name){
            res.status(400).json({error: "Name is required"});
        }
        const ship = await Ship.find({name: new RegExp(name, 'i')});
        res.json(ship);
    }catch(
        res.status(500).json({error: err.message});
    )
};
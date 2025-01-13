const Ship = require('../models/ShipDataModel');

exports.getShipbyName = async (req, res) =>{ 
    try {
        const ship = await Ship.find();
        res.json(ship);
    }catch(
        res.status(500).josn({error: err.message});
    )
};

// export getAllShipInfo = async (req, res) => {
//     try {
//         const shipData = ship
//     } catch (err) {
//         res.status(500).json({error: messege});
//     }
// };
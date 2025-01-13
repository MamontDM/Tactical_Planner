const mongoose = require('mongoose');


function processShipData(apiData) {
    console.log('Данные кораблей:', JSON.stringify(apiData, null, 2));
  


const shipSchema = new mongoose.Schema({
    id: Number,
    name: String,
    level: Number,
    nation: { name: String, icon: String },
    class: { name: String, icon: String },
});

const Ship = mongoose.model("Ship", shipSchema);



    return apiData;
}

module.exports = {
    processShipData,
};

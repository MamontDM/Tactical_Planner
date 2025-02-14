const Map = require("../../models/mapDbModel");
const User = require("../../models/UserDBModel");
const moongose = require('mongoose');




const createMap = async (req, res) => {
    try {
        const { snapshot, account_id } = req.body;
        if (!snapshot) {
            return res.status(400).json({ error: "Check object snapshot" });
        }

        const existingUser = await User.findOne({id: account_id});
        if(!existingUser){
            return res.status(404).json({error: "User not Found"});
        }
        const newMap = new Map({
            userId: existingUser._id,
            title: snapshot.metadata.mapName,
            data: snapshot.metadata,
        });

        console.log(newMap);
        const savedMap = await newMap.save();

        return res.status(201).json({ message: "Карта сохранена!", map: savedMap });

    } catch (error) {
        console.error("Ошибка при создании карты:", error.message);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};

const getUserMaps = async (req, res) => {
    try {
        const maps = await Map.find({ userId: req.account_id });
        res.json(maps);
    } catch (error) {
        console.error("Ошибка при получении карт:", error.message);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};


 const deleteMap = async (req, res) => {
    try {
        const deletedMap = await Map.findOneAndDelete({ _id: req.params.id, userId: req.account_id });

        if (!deletedMap) {
            return res.status(404).json({ error: "map is not found" });
        }

        res.json({ message: "Delete is success!" });
    } catch (error) {
        console.error("Ошибка при удалении карты:", error.message);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};


module.exports = { createMap, getUserMaps, deleteMap };
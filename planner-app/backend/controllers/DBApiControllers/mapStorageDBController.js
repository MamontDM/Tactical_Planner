const Map = require("../../models/mapDbModel");
const User = require("../../models/UserDBModel");
const moongose = require('mongoose');

const createMap = async (req, res) => {
    try {
        const { snapshot, account_id } = req.body;
        if (!snapshot) {
            return res.status(400).json({ error: "Check object snapshot" });
        }
        console.log('called');
        const newMap = new Map({
            userExternalId: account_id,
            id: snapshot.id,
            activeMap: snapshot.id,
            name: snapshot.name,
            img: snapshot.img,
            mapData: snapshot.mapData,
            objects: snapshot.objects,
            size: snapshot.size,
            url: snapshot.url,
            value: snapshot.value,
            miniImg: snapshot.mini
        });

        const savedMap = await newMap.save();
        
        return res.status(201).json({ message: "Карта сохранена!", map: savedMap });

    } catch (error) {
        console.error("Ошибка при создании карты:", error.message);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};

const getUserMaps = async (req, res) => {
    try {
        const maps = await Map.find({ userExternalId: req.body.account_id });
        res.json(maps);
    } catch (error) {
        console.error("Ошибка при получении карт:", error.message);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};


 const deleteMap = async (req, res) => {
    console.log(req.params.id);
    try {
        const deletedMap = await Map.findByIdAndDelete(req.params.id);
        if (!deletedMap) {
            return res.status(404).json({ error: "map is not found" });
        }
        console.log(deleteMap);

        res.json({ message: "Delete is success!" });
    } catch (error) {
        console.error("Ошибка при удалении карты:", error.message);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};


module.exports = { createMap, getUserMaps, deleteMap };
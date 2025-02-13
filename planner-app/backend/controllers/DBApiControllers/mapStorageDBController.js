// const Map = require("../models/Map");




exports.createMap = async (req, res) => {
    try {
        const { title, data } = req.body;

        if (!title || !data) {
            return res.status(400).json({ error: "Name is required" });
        }

        const newMap = new Map({
            userId: req.account_id,
            title,
            data
        });

        const savedMap = await newMap.save();
        res.status(201).json({ message: "Карта сохранена!", map: savedMap });

    } catch (error) {
        console.error("Ошибка при создании карты:", error.message);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};

exports.getUserMaps = async (req, res) => {
    try {
        const maps = await Map.find({ userId: req.account_id });
        res.json(maps);
    } catch (error) {
        console.error("Ошибка при получении карт:", error.message);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};


exports.deleteMap = async (req, res) => {
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


// module.exports = { createMap, getUserMaps, deleteMap };
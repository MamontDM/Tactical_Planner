import React,  { useState } from 'react';


const ShipList =({title, numberOfItems, placehodler}) =>{
    const [shipNames, setShipNames] = useState();
    const [searchResult, setSearchresult] = useState([]);
    const [loadingIndex, setLoadingIndex] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async (index) => {
        const query = shipNames[index];
        if (!query) {
            setError("Enter a ship name to search.");
            return;
        }
        try {
            setLoadingIndex(index);
            const response = await fetch(`/api//name-search?name=${query}`);
            const result = await response.json();
            setSearchresult(result);
            console.log("Search result is:", result);
        } catch (error) {
            setError("Failed to fetch ships. Please try again.");
        } finally {
            setLoadingIndex(null);
        }
    };

    const handleAddShip = (index, ship) => {
        const updateShipNames = [...shipNames];
        updateShipNames[index] = ship.name;
        setShipNames(updateShipNames);
        setSearchresult([]);
    };

    return (
        <div className="ship-list">
            <h3>{title}</h3>
            <button
                    className="shipADD-button"
                    onClick={handleSearch}
            >
            Add Ships...</button>
            {/* {numberOfItems.map(
                <li>
                    Ships
                </li>
            )} */}
        </div>
    );
};

export default ShipList;
import React,  { useState } from 'react';


const ShipList =({title, numberofItems, placehodler}) =>{
    const [shipNames, setShipNames] = useState(Array(numberofItems).fill(''));
    const [searchResult, setSearchresult] = useState([]);
    const [loadingIndex, setLoadingIndex] = useState(null);



    const handleSearch = async (index) => {
        const query = shipNames[index];
        try {
            setLoadingIndex(index);
            const response = await fetch(`/api//name-search?name=${query}`);
            const result = await response.json();
            setSearchresult(result);
            console.log("Search result is:", result);
        } catch (error) {
            console.error("Error during search:" , error);
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
            {Array.from({length: numberofItems}, (_, index) => (
                <div key={index} className="ship-input">
                    <label>{title} {index +1} </label>
                    <input
                        type="text"
                        value={shipNames[index]}
                        placehodler={placehodler}
                        onChange={(e) => {
                            const updateShipNames = [...shipNames];
                            updateShipNames[index] = e.target.value;
                            setShipNames(updateShipNames);
                        }}
                    />
                    <button 
                        onClick={() => handleSearch(index)}
                        disabled={loadingIndex === index}>
                            {loadingIndex === index ? "Searching..." : ship ? "Add" : "Search"}
                        </button>
                    {searchResult.length > 0 && loadingIndex === null && (
                        <div className="search-results">
                            <ul>
                                {searchResult.map((result) => (
                                    <li key={result.id}>
                                        {result.name}
                                        <button onClick={() => handleAddShip(index, result)}>Add</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ShipList;
import React,  { useState } from 'react';


const ShipList =({title, numberofItems, placehodler}) =>{
    const [shipNames, setShipNames] = useState(Array(numberofItems).fill(''));

    const handleInputToChange = (index, value) => {
        const updateShipNames = [...shipNames];
        updateShipNames[index] = value;
        setShipNames(updateShipNames);
    };


    const handleSearch = async (index) => {
        const query = shipNames[index];
        try {
            const response = await fetch(`/api//name-search?name=${query}`);
            const result = await response.json();
            console.log("Search result is:", result);
        } catch (error) {
            console.error("Error during search:" , error);
        }
    } 

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
                        onChange={(e) => handleInputToChange(index, e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
};

export default ShipList;
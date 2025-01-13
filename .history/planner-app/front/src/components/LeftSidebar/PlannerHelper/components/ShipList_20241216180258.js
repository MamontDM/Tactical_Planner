import React,  { useState } from 'react';


const ShipList =({title, numberOfItems, placehodler}) =>{
    const [shipNames, setShipNames] = useState();
    const [searchResult, setSearchresult] = useState([]);
    
    const handleSearch = async (query) => {
        console.log(query)
        if (!query) {
            console.log('ops query is missing');
            return;
        }

        try {
            const response = await fetch(`/api//name-search?name=${query}`);
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Gone wrong', error);
        }
    };

    return (
        <div className="ship-list">
            <h3>{title}</h3>
            <input
                    type="search"
                    onChange={(e) => handleSearch(e.target.value)}
                    placehodler={'Search by Name'}
             />
            {Array.from({length: numberOfItems},(_, index) => (
                <li key={index}>
                    Ships {index + 1}
                </li>
            ))}
        </div>
    );
};

export default ShipList;
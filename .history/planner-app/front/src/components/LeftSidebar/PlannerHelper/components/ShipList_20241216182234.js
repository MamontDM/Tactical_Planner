import React,  { useState } from 'react';


const ShipList =({title, numberOfItems, placehodler}) =>{
    const [shipNames, setShipNames] = useState('');
    const [searchResult, setSearchresult] = useState([]);
    
    const handleSearch = async (query) => {
        console.log(query)
        if (!query) {
            console.log('ops query is missing');
            return;
        }

        try {
            const response = await fetch(`/api/name-search?name=${query}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }

       const result = await response.json();
      console.log("Search Result:", result);
      setSearchresult(result); // Обновляем состояние
    } catch (error) {
      console.error("Something went wrong", error.message);
    }
    };

    return (
        <div className="ship-list">
            <h3>{title}</h3>
            <input
                    type="search"
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder={'Search by Name'}
             />
             <ul>
            {Array.from({length: numberOfItems},(_, index) => (
                <li key={index}>
                    Ships {index + 1}
                </li>
            ))}
                </ul>
                <div>
        {searchResult.map((item, idx) => (
          <p key={idx}>{item.name || "No name available"}</p>
        ))}
      </div>
        </div>
    );
};

export default ShipList;
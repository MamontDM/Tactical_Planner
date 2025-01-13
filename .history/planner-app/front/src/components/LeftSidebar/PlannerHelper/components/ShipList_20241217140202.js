import React,  { useState, useEffect } from 'react';
import DropdownSearch from '../../../shared/DropDownSearch';


const ShipList =({title, numberOfItems, placehodler}) =>{
    const [ships, setShips] = useState('');
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [filteredShips, setFilteredShips] = useState([]);


useEffect(() => {
  const fetchShips = async () => {
    try {
      const response = await fetch('api/name-allships');
      if(!response.ok){
        throw new Error("Failed to fetch all names!");
      }
      const data = await response.json();
      setShips(data);
      setFilteredShips(data);
      setIsDataLoaded(true);
    } catch (error) {
      console.error('Error fetching ships: ', error.message);
    }
  };
  if(!isDataLoaded) fetchShips();
}, [isDataLoaded]);

const handleSelect = (selectedShip) => {
  console.log('Selected ship:', selectedShip);
  // Можно выполнить дополнительный запрос для получения данных по ID
};

    return (
        <div className="ship-list">
            <h3>{title}</h3>
          <DropdownSearch 
                        dataSource={searchResult}
                        onSelect={(item) => onSelectedShip(item)}
                        placeholder = {'Add ship to list...'}
                      />
          <ul>
              {Array.from({length: numberOfItems},(_, index) => (
                  <li key={index}>
                      Ships {index + 1}
                  </li>
              ))}
          </ul>
        </div>
    );
};

export default ShipList;
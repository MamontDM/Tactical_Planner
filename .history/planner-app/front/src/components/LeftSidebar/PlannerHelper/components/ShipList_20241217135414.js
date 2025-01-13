import React,  { useState } from 'react';
import DropdownSearch from '../../../shared/DropDownSearch';


const ShipList =({title, numberOfItems, placehodler}) =>{
    const [shipNames, setShipNames] = useState('');
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [filteredShips, setFilteredShips] = useState([]);
useEffect(() => {
  const fetchShips = async () => {
    try {
      const response = await fetch('api/name-allships');
      if(!response.ok){
        throw new Error("Failed to fetch all names!");
        
      }
    } catch (error) {
      
    }
  }
})
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
import React,  { useState, useEffect, useRef } from 'react';
import DropdownSearch from '../../../shared/DropDownSearch';


const ShipList =({title, numberOfItems, placehodler}) =>{
    const [ships, setShips] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [selectedShips, setSelectedShips] = useState([]);
    const [shipId, setSiphId] = useState(null);


useEffect(() => {
  const fetchAllShipsName = async () => {
    try {
      const response = await fetch('api/name-allships');
      if(!response.ok){
        throw new Error("Failed to fetch all names!");
      }
      const data = await response.json();
      setShips(data);
      console.log(data);
      setIsDataLoaded(true);
    } catch (error) {
      console.error('Error fetching ships: ', error.message);
    }
  };
  if(!isDataLoaded) fetchAllShipsName();
}, [isDataLoaded]);

useEffect(() => {
  console.log(`need to call`)
  const fetchSelectedShips = async (id) =>{
    console.log("i called")
    try {
      const response = await fetch(`api/id-search?id=${encodeURIComponent(id)}`)
      if(!response.ok){
        throw new Error("Failed to fetch all names!");
      }
      const data = await response.json();
      console.log(data);
      setSelectedShips(data);
    } catch (error) {
      console.error('Error fetching by ID ships: ', error.message);
    }
  };
},[shipId]);

    return (
        <div className="ship-list">
            <h3>{title}</h3>
          <DropdownSearch 
                        dataSource={ships}
                        onSelect={(item) => setSiphId(item._id)}
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
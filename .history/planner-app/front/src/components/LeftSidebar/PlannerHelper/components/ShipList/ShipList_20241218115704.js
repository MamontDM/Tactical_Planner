import React,  { useState, useEffect, useRef } from 'react';
import DropdownSearch from '../../../../shared/DropDownSearch';
import ShipListCard from '../ShipsCard/ShipListCard';


const ShipList =({title, numberOfItems, placehodler}) =>{
    const [ships, setShips] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [selectedShips, setSelectedShips] = useState([]);
    const [shipId, setShipId] = useState(null);


    const fetchAllShipsName = async () => {
      try {
        const response = await fetch('api/name-allships');
        if(!response.ok){
          throw new Error("Failed to fetch all names!");
        }
        const data = await response.json();
        setShips(data);
        setIsDataLoaded(true);
      } catch (error) {
        console.error('Error fetching ships: ', error.message);
      }
    };

    const fetchSelectedShips = async (id) =>{
      try {
        const response = await fetch(`api/id-search?id=${encodeURIComponent(id)}`)
        if(!response.ok){
          throw new Error("Failed to fetch all names!");
        }
        const data = await response.json();
        addShipToList(data);
      } catch (error) {
        console.error('Error fetching by ID ships: ', error.message);
      }
    }

useEffect(() => {
  if(!isDataLoaded) {
    fetchAllShipsName();
  }
}, [isDataLoaded]);


const addShipToList = (ship) => {
  if(selectedShips.lenght < numberOfItems) {
    setSelectedShips((prev) => [...prev, ship]);
  }
};

useEffect(() => {
 if(shipId) fetchSelectedShips(shipId);
},[shipId]);

    return (
        <div className="ship-list">
            <h3>{title}</h3>
          <DropdownSearch 
                        dataSource={ships}
                        onSelect={(item) => setShipId(item._id)}
                        placeholder = {'Add ship to list...'}
          />
         {selectedShips.length !== 0 && ( <div className="ship-list-card">
            <li>
              {selectedShips.map((ship, index) => (
                <ShipListCard key={ship.id} ship={ship} />
              ))}
            </li>
          </div>)}
        </div>
    );
};

export default ShipList;
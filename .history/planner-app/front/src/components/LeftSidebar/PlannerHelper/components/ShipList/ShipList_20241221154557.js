import React,  { useState, useEffect, useRef } from 'react';
import DropdownSearch from '../../../../shared/DropDownSearch';
import ShipListCard from './ShipsCard/ShipListCard';

const ShipList =({}) =>{
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
    setSelectedShips((prev) => [...prev, ship]);
};

useEffect(() => {
 if(shipId) fetchSelectedShips(shipId);
},[shipId]);

    return (
        <div className="ship-list">
            <h3></h3>
          <DropdownSearch 
                        dataSource={ships}
                        onSelect={(item) => setShipId(item._id)}
                        placeholder = {'Add ship to list...'}
          />
        </div>
    );
};

export default ShipList;
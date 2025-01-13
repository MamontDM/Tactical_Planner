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
        console.log(data);
        setIsDataLoaded(true);
      } catch (error) {
        console.error('Error fetching ships: ', error.message);
      }
    };

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
    }

useEffect(() => {
  if(!isDataLoaded) fetchAllShipsName();
}, [isDataLoaded]);

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
          <ShipListCard 
                        data={selectedShips}
          />
        </div>
    );
};

export default ShipList;
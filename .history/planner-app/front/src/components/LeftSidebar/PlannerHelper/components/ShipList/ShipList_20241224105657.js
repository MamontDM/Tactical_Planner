import React,  { useState, useEffect, useRef } from 'react';
import DropdownSearch from '../../../../shared/DropDownSearch';
import ShipListCard from './ShipsCard/ShipListCard';
import { useShipContext } from '../../../../../hooks/useShipContext';

const ShipList =() =>{
  const { ships, isDataLoaded } = useShipContext();
  const { setSelectedShip } = useShipContext();
  const [ shipId, setShipId ] = useState(null);
  const [ isShipSelected, setIsShipSelected] = useState(false);

  const fetchSelectedShips = async (id) =>{
      try {
            const response = await fetch(`api/id-search?id=${encodeURIComponent(id)}`)
            if(!response.ok){
              throw new Error("Failed to fetch all names!");
            }
            const data = await response.json();
            addShipToList(data);
            setIsShipSelected(true);
      } catch (error) {
        console.error('Error fetching by ID ships: ', error.message);
      }
 }

 const addShipToList = (ship) => {
    setSelectedShip((prev) => ({
      ...prev,
      ship;
    }));
};


useEffect(() => {
    if (shipId) fetchSelectedShips(shipId);
}, [shipId]);

    return (
        <div className="ship-list">
          {!isShipSelected ? (
            <DropdownSearch 
                        dataSource={ships}
                        onSelect={(item) => setShipId(item._id)}
                        placeholder = {'Add ship to list...'}
          />) : (
            <ShipListCard  />
          )}
        </div>
    );
};

export default ShipList;
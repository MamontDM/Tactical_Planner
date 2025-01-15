import React,  { useState, useEffect, useRef } from 'react';
import './shipList.css';
import DropdownSearch from '../../../../../shared/DropDownSearch';
import ShipListCard from './ShipsCard/shipListCard';
import { useShipContext } from '../../../../../../hooks/useShipContext';

const ShipList = ({type, index}) =>{
  const { filteredShips, isDataLoaded, addShip, ships, removeShip } = useShipContext();
  const [ shipId, setShipId ] = useState(null);
  const [ isShipSelected, setIsShipSelected] = useState(false);
  const shipByTypeArr = filteredShips[type];
  const uniqueKey = `${type}-${index}`;
  const ship = ships[uniqueKey]?.[0];
 console.log(ships);

const handleAddShip = (item) => { 
    setShipId(item._id);
}

const shipRemove = (key, id) => {
  removeShip(key, id);
  setIsShipSelected(false);
}

useEffect(() => {
  return () => {
    if (ship) {
      removeShip(uniqueKey, ship.id);
    }
  };
}, [ship, uniqueKey, removeShip]);

useEffect(() => {
  if (shipId) {
    const fetchSelectedShips = async (id) => {
      try {
        const response = await fetch(`api/id-search?id=${encodeURIComponent(id)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch ships by ID!");
        }
        const data = await response.json();
        addShip(uniqueKey, data);
        setIsShipSelected(true);
      } catch (error) {
        console.error('Error fetching ship:', error.message);
      }
    };

    fetchSelectedShips(shipId);
  }
}, [shipId, addShip, uniqueKey]);



    return (
        <div className="ship-list">
          {!isShipSelected ? (
            <DropdownSearch 
                        dataSource={shipByTypeArr}
                        onSelect={handleAddShip}
                        placeholder = {'Add ship to list...'}
          />) : (
            <ShipListCard
                       key={ship.id} 
                       ship={ship} 
                       onRemove={() => shipRemove(uniqueKey, ship.id)}
                       />
          )}
        </div>
    );
};

export default ShipList;
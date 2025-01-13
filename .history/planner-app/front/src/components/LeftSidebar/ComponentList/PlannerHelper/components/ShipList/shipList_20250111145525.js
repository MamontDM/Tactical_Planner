import React,  { useState, useEffect, useRef } from 'react';
import './shipList.css';
import DropdownSearch from '../../../../../shared/DropDownSearch';
import ShipListCard from './ShipsCard/shipListCard';
import { useShipContext } from '../../../../../../hooks/useShipContext';

const ShipList = ({type, index}) =>{
  const { shipsNameList, isDataLoaded, addShip, ships, removeShip } = useShipContext();
  const [ filteredShips, setFilteredShips] = useState([]);
  const [ shipId, setShipId ] = useState(null);
  const [ isShipSelected, setIsShipSelected] = useState(false);
  const uniqueKey = `${type}-${index}`;

  const fetchSelectedShips = async (id) =>{
      try {
            const response = await fetch(`api/id-search?id=${encodeURIComponent(id)}`)
            if(!response.ok){
              throw new Error("Failed to fetch ships by ID!");
            }
            const data = await response.json();
            addShip(uniqueKey, data);
            setIsShipSelected(true);
      } catch (error) {
        console.error('Error fetching by ID ships: ', error.message);
      }
 }

const handleAddShip = (item) => { 
    setShipId(item._id);
}




const normalizeType = (type) => {
  return type.slice(0, -1);
};

useEffect(() => {
    const normalizeType = (type) => type.slice(0, -1);
    setFilteredShips(shipsNameList.filter((ship) => ship.class === normalizeType(type)));
    if (shipId) {
      fetchSelectedShips(shipId);
    }
}, [shipId, type]);

const ship = ships[uniqueKey];

    return (
        <div className="ship-list">
          {!isShipSelected ? (
            <DropdownSearch 
                        dataSource={filteredShips}
                        onSelect={handleAddShip}
                        placeholder = {'Add ship to list...'}
          />) : (
            <ShipListCard
                       key={ship.id} 
                       ship={ship} 
                       onRemove={() => removeShip(uniqueKey)}
                       />
          )}
        </div>
    );
};

export default ShipList;
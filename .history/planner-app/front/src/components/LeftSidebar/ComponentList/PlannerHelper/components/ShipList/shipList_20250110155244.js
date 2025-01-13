import React,  { useState, useEffect, useRef } from 'react';
import './shipList.css';
import DropdownSearch from '../../../../../shared/DropDownSearch';
import ShipListCard from './ShipsCard/shipListCard';
import { useShipContext } from '../../../../../../hooks/useShipContext';

const ShipList = ({type}) =>{
  const { shipsNameList, isDataLoaded, addShip } = useShipContext();
  const [ filteredShips, setFilteredShips] = useState([]);
  const [ shipId, setShipId ] = useState(null);
  const [ isShipSelected, setIsShipSelected] = useState(false);

  const fetchSelectedShips = async (id) =>{
      try {
            const response = await fetch(`api/id-search?id=${encodeURIComponent(id)}`)
            if(!response.ok){
              throw new Error("Failed to fetch ships by ID!");
            }
            const data = await response.json();
            addShip(data);
            setIsShipSelected(true);
      } catch (error) {
        console.error('Error fetching by ID ships: ', error.message);
      }
 }


const handleAddShip = (item) => { 
  console.log(item);
    setShipId(item._id);
}


const normalizeType = (type) => {
  return type.slice(0, -1);
};

useEffect(() => {
    setFilteredShips(shipsNameList.filter((ship) => ship.class === normalizeType(type)));
    if (shipId) {
      fetchSelectedShips(shipId);
    }
}, [shipId, type]);

    return (
        <div className="ship-list">
          {!isShipSelected ? (
            <DropdownSearch 
                        dataSource={filteredShips}
                        onSelect={handleAddShip}
                        placeholder = {'Add ship to list...'}
          />) : (
            <ShipListCard  />
          )}
        </div>
    );
};

export default ShipList;
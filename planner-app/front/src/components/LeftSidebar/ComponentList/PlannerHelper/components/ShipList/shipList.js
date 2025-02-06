import React,  { useState, useEffect, useRef } from 'react';
import './shipList.css';
import DropdownSearch from '../../../../../shared/DropDownSearch';
import ShipListCard from './ShipsCard/shipListCard';
import { useShipContext } from '../../../../../../hooks/useShipContext';

const ShipList = ({uniqueKey, type, index, clearListFlag}) =>{
  const { filteredShips, addShip, ships, removeShip } = useShipContext();
  const [ shipId, setShipId ] = useState(null);
  const [ isShipSelected, setIsShipSelected] = useState(false);
  const filteredByType = filteredShips[type]; 
  const keyRef = useRef(uniqueKey);


  const fetchSelectedShips = async (id) =>{
      try {
            const response = await fetch(`${REACT_APP_API_BASE_URL}/api/ship/id-search?id=${encodeURIComponent(id)}`)
            if(!response.ok){
              throw new Error("Failed to fetch ships by ID!");
            }
            const data = await response.json();
            addShip(keyRef.current, data);
            setIsShipSelected(true);
      } catch (error) {
        console.error('Error fetching by ID ships: ', error.message);
      }
 }

const handleAddShip = (item) => { 
    setShipId(item._id);
}

const shipRemove = (key) => {
  removeShip(key);
  setIsShipSelected(false);
}

useEffect(() => {
  if (clearListFlag) {
      setIsShipSelected(false); 
  }

}, [clearListFlag]);


useEffect(() =>{
  if (shipId) {
    fetchSelectedShips(shipId);
  }
},[shipId]);

useEffect(() => {
  const currentKey = keyRef.current;

    return () => {
      if (currentKey){
          removeShip(currentKey); 
      }
      
  };
},[removeShip]);


const ship = ships[keyRef.current]?.[0];

    return (
        <div className="ship-list">
          {!isShipSelected ? (
            <DropdownSearch 
                        dataSource={filteredByType}
                        onSelect={handleAddShip}
                        placeholder = {'Add ship to list...'}
          />) : (
            <ShipListCard
                       key={ship.id} 
                       ship={ship} 
                       onRemove={() => shipRemove(keyRef.current)}
                       />
          )}
        </div>
    );
};

export default ShipList;
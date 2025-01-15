keyimport React,  { useState, useEffect, useRef } from 'react';
import './shipList.css';
import DropdownSearch from '../../../../../shared/DropDownSearch';
import ShipListCard from './ShipsCard/shipListCard';
import { useShipContext } from '../../../../../../hooks/useShipContext';

const ShipList = ({key, type, index, clearListFlag}) =>{
  const { filteredShips, isDataLoaded, addShip, ships, removeShip } = useShipContext();
  const [ shipId, setShipId ] = useState(null);
  const [ isShipSelected, setIsShipSelected] = useState(false);
  const filteredByType = filteredShips[type]; 
  const removeShipRef = useRef(removeShip);


  const fetchSelectedShips = async (id) =>{
      try {
            const response = await fetch(`api/id-search?id=${encodeURIComponent(id)}`)
            if(!response.ok){
              throw new Error("Failed to fetch ships by ID!");
            }
            const data = await response.json();
            addShip(key, data);
            setIsShipSelected(true);
      } catch (error) {
        console.error('Error fetching by ID ships: ', error.message);
      }
 }

const handleAddShip = (item) => { 
    setShipId(item._id);
}

const shipRemove = (key, id) => {
  removeShip(key, id);
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
    return () => {
      console.log('Я размонтировался: ', key);
  };
},[removeShip]);


const ship = ships[key]?.[0];


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
                       onRemove={() => shipRemove(key)}
                       />
          )}
        </div>
    );
};

export default ShipList;
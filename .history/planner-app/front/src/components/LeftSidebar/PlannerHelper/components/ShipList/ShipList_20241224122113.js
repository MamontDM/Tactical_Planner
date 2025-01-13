import React,  { useState, useEffect, useRef } from 'react';
import DropdownSearch from '../../../../shared/DropDownSearch';
import ShipListCard from './ShipsCard/ShipListCard';
import { useShipContext } from '../../../../../hooks/useShipContext';

const ShipList = ({type}) =>{
  const { ships, isDataLoaded } = useShipContext();
  const [ selectedShips, setSelectedShips] = useState([]);
  const [filteredShips, setFilteredShips] = useState([]);
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
            console.log(data);
            setIsShipSelected(true);
      } catch (error) {
        console.error('Error fetching by ID ships: ', error.message);
      }
 }

 const addShipToList = (ship) => {
    setSelectedShips((prev) => [...prev, ship]);
};
const normalizeType = (type) => {
  return type.toLowerCase().slice(0, -1);
};

useEffect(() => {
  
    setFilteredShips(ships.filter((ship) => ship.class === type));
}, [shipId, type]);

    return (
        <div className="ship-list">
          {!isShipSelected ? (
            <DropdownSearch 
                        dataSource={filteredShips}
                        onSelect={(item) => setShipId(item._id)}
                        placeholder = {'Add ship to list...'}
          />) : (
            <ShipListCard ship={selectedShips} />
          )}
        </div>
    );
};

export default ShipList;
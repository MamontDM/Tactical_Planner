import React, { useContext } from 'react';
import DropdownWithSearch from '../../shared/DropDownSearch';
import maps from '../../../assets/maps.json'


function MapSelector(){
    const handleSelect = item => {
        console.log(`Выбран элемент с iD : ${item.id}`);
    };

    return (
        <div>
            <h2>Map Selector</h2>
            <DropdownWithSearch 
                dataSource = {maps.maps}
                onSelect = {handleSelect}
                placeholder="Search map by name...."
                />
        </div>
    );
}

export default MapSelector;
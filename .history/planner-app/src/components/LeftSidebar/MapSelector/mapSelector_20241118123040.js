import React from 'react';
import DropdownWithSearch from '../../shared/DropDownSearch';
import maps.json from '../../assets/maps.json'

function MapSelector(){
    const handleSelect = item => {
        console.log(`Выбран элемент с iD : ${item.id}`);
    };

    return (
        <div>
            <h1>Dropdown</h1>
            <DropdownWithSearch 
                dataSource = '../../assets/maps.json'
                onSelect = {handleSelect}
                placeholder="Search a map...."
                />
        </div>
    );
}

export default MapSelector;
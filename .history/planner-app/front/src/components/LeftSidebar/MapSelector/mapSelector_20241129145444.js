import React, { useContext } from 'react';
import DropdownWithSearch from '../../shared/DropDownSearch';
import * as maps from '../../../assets/exportMaps.js';
import CanvasContext from '../../contexts/CanvasContext';




function MapSelector(){

    const { backgroundCanvasRef, getBackgrounCanvasContext } = useContext(CanvasContext);
    console.log(maps);
    const handleSelect = item => {
        console.log(item);
        const backCanvas = backgroundCanvasRef.current;
        backCanvas.style.backgroundImage = `url(${item.image_url})`;
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
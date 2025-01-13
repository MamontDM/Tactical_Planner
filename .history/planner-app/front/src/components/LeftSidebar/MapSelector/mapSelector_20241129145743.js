import React, { useContext } from 'react';
import DropdownWithSearch from '../../shared/DropDownSearch';
import * as maps from '../../../assets/exportMaps';
import CanvasContext from '../../contexts/CanvasContext';




function MapSelector(){
    console.log(maps);
    const { backgroundCanvasRef, getBackgrounCanvasContext } = useContext(CanvasContext);
  
    const handleSelect = item => {
        console.log(item);
        const backCanvas = backgroundCanvasRef.current;
        backCanvas.style.backgroundImage = `url(${item.image_url})`;
    };





    return (
        <div>
            <h2>Map Selector</h2>
            <DropdownWithSearch 
                dataSource = {'sdf'}
                onSelect = {handleSelect}
                placeholder="Search map by name...."
                />
        </div>
    );
}

export default MapSelector;
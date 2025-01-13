import React, { useContext } from 'react';
import DropdownWithSearch from '../../shared/DropDownSearch';
import { Archipelago, Atlantic, BigRace, Estuary, FaroeIsland, Greece, Haven, Hotspot, IslandofIce, LandofFire, Loop, MountainRange, Neighbors, NewDawn, North, NorthernWaters, Ring, Riposte,
    SeaofFortune,
    Shards,
    Shatter,
    SleepingGiant,
    TearsofDragon,
    Trap,
    Trident,
    WarriorPath,
    ZoneCrashAlpha} from '../../../assets/exportMaps';
import CanvasContext from '../../contexts/CanvasContext';




function MapSelector(){

    const mapsName = {
        
    }


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
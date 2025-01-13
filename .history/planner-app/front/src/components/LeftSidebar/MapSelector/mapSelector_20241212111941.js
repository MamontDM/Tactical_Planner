import React, { useContext, useState, useEffect} from 'react';
import DropdownWithSearch from '../../shared/DropDownSearch';
import CanvasContext from '../../contexts/CanvasContext';
import { Archipelago, Atlantic, BigRace, Estuary, FaroeIsland, Greece, Haven, Hotspot, IslandofIce, 
    LandofFire, Loop, MountainRange, Neighbors, NewDawn, North, NorthernWaters, Ring, Riposte, SeaofFortune,
    Shards, Shatter, SleepingGiant, TearsofDragon, Trap, Trident, WarriorPath, ZoneCrashAlpha} from '../../../assets/exportMaps';
import { MapContext } from '../../contexts/MapSelectorContext';

function MapSelector(){

    const [mapList, setmaplist] = useState([]);
    const { dispatch, state } = useContext(MapContext);

    const mapsName = {
    'Archipelago'     : Archipelago,
    'Atlantic'        : Atlantic,
    'Big Race'        : BigRace,
    'Estuary'         : Estuary,
    'Faroe Island'    : FaroeIsland,
    'Greece'          : Greece,
    'Haven'           : Haven,
    'Hotspot'         : Hotspot,
    'Island of Ice'   : IslandofIce,
    'Land of Fire'    : LandofFire,
    'Loop'            : Loop,
    'MountainRange'   : MountainRange,
    'Neighbors'       : Neighbors,
    'New Dawn'        : NewDawn,
    'North'           : North,
    'Northern Waters' : NorthernWaters,
    'Ring'            : Ring,
    'Riposte'         : Riposte,
    'Sea of Fortune'  : SeaofFortune,
    'Shards'          : Shards,
    'Shatte'          : Shatter,
    'Sleeping Giant'  : SleepingGiant,
    'Tears of Dragon' : TearsofDragon,
    'Trap'            : Trap,
    'Triden'          : Trident,
    'Warrior Path'    : WarriorPath,
    'Zone Crash Alpha': ZoneCrashAlpha
    };

    const { backgroundCanvasRef, clearBackground } = useContext(CanvasContext);
    
    const mapListArray = Object.entries(mapsName).map(([name, value]) => ({
        name,
        value,
    }));

    useEffect(() =>{
        if(state.maps && state.maps.length > 0){
            setmaplist(state.maps.map(map => ({
                name: map.mapName,
                value: mapsName[map.mapName],
            })));
        }
    }, [state.maps, mapsName]);

    const handleSelect = (item) => {
      const isExist = mapList.some((existItem) => existItem.name === item.name);
      
        if(!isExist){
            addMapToList(item);
            renderMap(item.value);
        }else {
            console.log('already exist')
        }
       
    };

    const renderMap = (source) => {
       clearBackground();
        const backCanvas = backgroundCanvasRef.current;
        if (source) {
            backCanvas.style.backgroundImage = `url(${source})`;
            backCanvas.style.backgroundSize = 'cover';
            backCanvas.style.backgroundRepeat = 'no-repeat';
        } else {
            console.error(`Путь к изображению не найден или не корректный.`);
        }
    };

    const handleClearMap = () =>{
        clearBackground();
        
    };
    const handleClearMapList = () =>{
        setmaplist((prev) => []);
        dispatch({ type: 'CLEAR_MAPLIST'});
    };

    const addMapToList = (item) =>{
        setmaplist((prev) =>[...prev, item]);
       
        dispatch({
            type: 'ADD_MAP',
            payload: {
                id: item.name,
                selectedMapId: item.name,
                mapName: item.name,
                objects: [],
            },
        });
        dispatch({
            type: 'SELECT_MAP',
            payload: item.name,
        });
    };

    const changeContext = (item) => {
        dispatch({
            type: 'SELECT_MAP',
            payload: item.name,
            
        });
        renderMap(item.value);
    };

    return (
        <div>
            <h2>Map Selector</h2>
            <DropdownWithSearch 
                dataSource = {mapListArray}
                onSelect = {handleSelect}
                placeholder="Search map by name...."
                />
                <button 
                    className="clearMap-button"
                    onClick={handleClearMap}
                >
                    Clear map
                </button>
            <div className="mapselector-list">
                <h2>Hello</h2>
                {mapList.map(item =>(
                   <li key={item.name} >
                        <button
                            id={item.name}
                            onClick={() => changeContext(item)}
                            >
                                {item.name}
                        </button>
                    </li>
                    ))}
                    {mapList.length > 0 && 
                    <button
                        className="clearMap-button"
                        onClick={handleClearMapList}
                        >
                            Clear Map List
                    </button>}
                </div>
        </div>
    );
}

export default MapSelector;
import React, { useContext, useState, useEffect} from 'react';
import './mapSelector.css';
import DropdownWithSearch from '../../../shared/DropDownSearch';
import CanvasContext from '../../../contexts/CanvasContext';
import { Archipelago, Atlantic, BigRace, Estuary, FaroeIsland, Greece, Haven, Hotspot, IslandofIce, 
    LandofFire, Loop, MountainRange, Neighbors, NewDawn, North, NorthernWaters, Ring, Riposte, SeaofFortune,
    Shards, Shatter, SleepingGiant, Strait, TearsofDragon, Trap, Trident, WarriorPath, ZoneCrashAlpha} from '../../../../assets/exportMaps';
import { MapContext } from '../../../contexts/MapSelectorContext';

function MapSelector(){

    const [mapList, setmaplist] = useState([]);
    const { dispatch, state } = useContext(MapContext);
    const [isEditing, setIsEditing] = useState(false);

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
    'Shatter'         : Shatter,
    'Sleeping Giant'  : SleepingGiant,
    'Strait'          : Strait,
    'Tears of Dragon' : TearsofDragon,
    'Trap'            : Trap,
    'Triden'          : Trident,
    'Warrior Path'    : WarriorPath,
    'Zone Crash Alpha': ZoneCrashAlpha
    };

    const { backgroundCanvasRef, clearBackground, getBackgroundCanvasContext } = useContext(CanvasContext);
    
    const mapListArray = Object.entries(mapsName).map(([name, value]) => ({
        name,
        value,
    }));

    useEffect(() =>{
        if(state.maps){
            const genArrayMaps = Object.values(state.maps);
            setmaplist(genArrayMaps.map(map => ({
                name: map.mapName,
                value: map.value,
            })));
        }
    }, [state.maps]);

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
        const ctx = getBackgroundCanvasContext();
        if (source) {
           const bgImage = new Image();
           bgImage.src = source;

           bgImage.onload = () =>{
                ctx.drawImage(bgImage, 0, 0, backCanvas.width, backCanvas.height);
           };
                bgImage.onerror = () => {
                    console.error(`Ошибка загрузки изображения: ${source}`);
                };
        } else {
            console.error(`Путь к изображению не найден или не корректный.`);
        }
    };

    const handleClearMap = (item) =>{
        console.log()
        dispatch({type: "REMOVE_MAP", payload: {
            selectedMapId : item.name,
        }})
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
                value: item.value,
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
        <div className="mapSelector-content">
            <DropdownWithSearch 
                dataSource = {mapListArray}
                onSelect = {handleSelect}
                placeholder="Search map by name...."
                />
            <div className="mapselector-list">
                {mapList.map(item =>(
                    <React.Fragment key={item.name}>
                        <button className="list-item"
                            key={item.name}
                            id={item.name}
                            onClick={() => changeContext(item)}
                            >
                                {item.name}
                        </button>
                       { isEditing && <button 
                        className="clearMap-button"
                        onClick={() => handleClearMap(item)}
                        >
                            Delete from List
                     </button>}
                     </React.Fragment>
                    ))}
                    { mapList.length > 0 && 
                    <button  className="edit-list-button"
                                onClick={() => setIsEditing((prev) => !prev)}
                                > 
                                {isEditing ? "Save" : "Edit"}
                    </button>}
                </div>
                {mapList.length > 0 && 
                    <button className="clear-list-button"
                        onClick={handleClearMapList}
                        >
                        Clear Map List
                    </button>}
                 
        </div>
    );
}

export default MapSelector;
import React, { useContext, useState, useEffect} from 'react';
import './mapSelector.css';
import DropdownWithSearch from '../../../shared/DropDownSearch';
import CanvasContext from '../../../contexts/CanvasContext';
import avaliableMaps from "./mapConfig.json";
import { useMapStore } from '@/store/zustand/MapStore/mapStore';


const  MapSelector = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { backgroundCanvasRef, clearBackground, getBackgroundCanvasContext } = useContext(CanvasContext);
    const maps = useMapStore((state) => state.maps);
    const mapList = Object.values(maps);
    const addMap = useMapStore((state) => state.addMap);
    const removeMap = useMapStore((state) => state.removeMap);
    const removeAllMap = useMapStore((state) => state.removeAllMap);
    const selectMap = useMapStore((state) => state.selectMap);
    const selectedMapId = useMapStore((state) => state.selectedMapId);
    
    



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

    const handleSelect = (item) => {
        console.log(item)
        addMap(item);
        renderMap(item.url);
    };

    const handleClearMap = (item) =>{
        removeMap(item.id);
        clearBackground();

        const updatedMaps = useMapStore.getState().maps;
        const firstMap = Object.values(updatedMaps)[0];

        if (firstMap) {
            selectMap(firstMap.id);
            renderMap(firstMap.url);
        } else {
            selectMap(null);
        }
    };

    const handleClearMapList = () =>{
        removeAllMap()
        clearBackground();
        selectMap(null);
    };

    const changeContext = (item) => {
        console.log(item)
       selectMap(item.id)
        renderMap(item.url);
    };

    return (
        <div className="mapSelector-content">
            <DropdownWithSearch 
                dataSource = {Object.values(avaliableMaps)}
                onSelect = {handleSelect}
                placeholder="Search map by name...."
                />
            <div className="mapselector-list">
                {mapList.map(item =>(
                    <React.Fragment key={item.name}>
                        <button className={`list-item ${selectedMapId === item.id ? 'active' : ""}`}
                            key={item.name}
                            id={item.id}
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
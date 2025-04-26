import React, { useState} from 'react';
import './mapSelector.css';
import DropdownWithSearch from '../../../shared/DropDownSearch';
import avaliableMaps from "./mapConfig.json";
import { useMapStore } from '@/store/zustand/MapStore/mapStore';
import { useMapActionManager } from '../../../../hooks/useMapActionManager';


const  MapSelector = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { handleSelectMap } = useMapActionManager();
    const maps = useMapStore((state) => state.maps);
    const mapList = Object.values(maps);
    const removeMap = useMapStore((state) => state.removeMap);
    const removeAllMap = useMapStore((state) => state.removeAllMap);
    const selectedMapId = useMapStore((state) => state.selectedMapId);

    const handleSelect = (item) => {
        handleSelectMap(item);
    };

    const handleClearMap = (item) =>{
        removeMap(item.id);
        const updatedMaps = useMapStore.getState().maps;
        const firstMap = Object.values(updatedMaps)[0];

        if (firstMap) {
            handleSelectMap(firstMap);
        } else {
            handleSelectMap(null);
        }
        
    };

    const handleClearMapList = () =>{
        removeAllMap()
        handleSelectMap(null);

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
                            onClick={() => handleSelectMap(item)}
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
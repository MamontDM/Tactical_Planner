import React from  'react';
import { useActiveToolStore } from '@/store/zustand/Toolbar/activeToolStore';
import { useToolSettings } from '@/store/zustand/Toolbar/toolsettingStore';
import { useMapStore } from "@/store/zustand/MapStore/mapStore"
import { kmToPixels } from '../../../../../utils/mapScale';

const RadarToolSettings = () =>{
    const activeTool = useActiveToolStore((state) => state.activeTool);
    const updateSettings = useToolSettings((state) => state.updateSettings);
    const mapSize = useMapStore((state) => state.getMapSize)
    const size = mapSize();
    

    const handleSettingChange = (name, value) => {
        const radius = kmToPixels(value, size)
        if(radius){
            updateSettings(activeTool, {[name]: radius})
        }
    }

    return (
        <div className="radar-settings">
            <button className={'radar-set-button'}
                name="range"
                data-value="9"
                onClick={(e) => handleSettingChange(e.target.name, e.currentTarget.dataset.value)}>
                    9 km
            </button>
            <button  className={'radar-set-button'} 
                name="range"
                data-value="12"
                onClick={(e) => handleSettingChange( e.target.name, e.currentTarget.dataset.value)}>
                    12 km
            </button>
            <label> Manual range</label>
            <input
                type="number"
                name="range"
                onChange={(e) => handleSettingChange(e.target.name, e.target.value)}>
            </input>
        </div>
    );
};

export default RadarToolSettings;




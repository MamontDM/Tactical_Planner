import React, { useState } from  'react';
import useActiveToolStore from '../../../../../store/zustand/Toolbar/activeToolStore';
import useToolSettings from '../../../../../store/zustand/Toolbar/toolsettingStore';

const RadarToolSettings = () =>{
    const activeTool = useActiveToolStore((state) => state.activeTool);
    const updateSettings = useToolSettings((state) => state.updateSettings);

    const handleSettingChange = (name, value) => {
        updateSettings(activeTool, {[name]: value})
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




import React, { useState } from  'react';

const RadarToolSettings = ({onChangeToolSettings}) =>{

    const handleSettingChange = (type, value) => {
        if(type === 'number'){
            if(value < 0 || value > 12){
                console.warn('value is out of range')
                return;
            }
        }
        onChangeToolSettings(type, value);
    };

    return (
        <div className="radar-settings">
            <button className={'radar-set-button'}
                data-type="range"
                data-value="9"
                onClick={(e) => handleSettingChange(e.currentTarget.dataset.type, e.currentTarget.dataset.value)}>
                    9 km
            </button>
            <button  className={'radar-set-button'} 
                data-type="range"
                data-value="12"
                onClick={(e) => handleSettingChange( e.currentTarget.dataset.type, e.currentTarget.dataset.value)}>
                    12 km
            </button>
            <label> Manual range</label>
            <input
                type="number"
                data-type="range"
                onChange={(e) => handleSettingChange(e.currentTarget.dataset.type, e.target.value)}>
            </input>
        </div>
    );
};

export default RadarToolSettings;




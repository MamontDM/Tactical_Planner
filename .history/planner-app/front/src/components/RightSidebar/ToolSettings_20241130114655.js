import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const ToolSetting = ({ commonSettings, onChangeCommonSettings }) =>{

    return (
    <div clasName="tool-settings">
        <div clasName="common-settings">
            <label>
                Line width:
                <input
                    type="number"
                    value={commonSettings.lineWidth}
                    onChange={(e) => onChangeCommonSettings({lineWidth: e.target.value})} 
            </label>
            
        </div>
    </div>
);
};

   

export default ToolSetting;
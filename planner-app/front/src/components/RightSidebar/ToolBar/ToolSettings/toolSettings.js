import React, { useState, useEffect } from 'react';
import { useSettingContext } from '../../../../hooks/useSettingContext';
import './toolSettings.css';
import GradientColorInput from '../../../shared/Inputs/GradientColorInput'
import TextToolSettings from '../Tools/TextTool/TextToolSettings';
import IconToolSettings from '../Tools/IconTool/IconToolSetting';
import RadarToolSettings from '../Tools/RadarTool/RadarToolSetting';

const ToolSettings = ({ type, onSettingChange }) => {
    console.log('called Setting tool!')
    const { toolSettings } = useSettingContext();
    const [ localToolSetting, setLocalToolSetting ] = useState(() => toolSettings[type]);

    const handleChange = (type, value) => {
            if(type === "shipFromList"){
                setLocalToolSetting((prev) => ({
                    ...prev,
                    shipType: value.shipType,
                    label: value.label,
                }));
            }else {
            setLocalToolSetting((prev) => ({
                ...prev,
                [type]: value,
            }))
        }
    };
 

    useEffect(() => {
        onSettingChange(localToolSetting);
    },[localToolSetting]);

    return (
        <div  className="common-settings">
       {  type !== 'text'&& type !=='icon' && ( <label>
                Line Width:
                <input
                    type="number"
                    value={localToolSetting.lineWidth}
                    onChange={(e) => handleChange('lineWidth', e.target.value)}
                />
            </label>
        )}
            <GradientColorInput  onColorChange={(value) => handleChange('color', value)}/>
                {type === 'text' && ( <TextToolSettings
                    onChangeToolSettings={(type, value) => handleChange(type, value)}/>
                )}
                {type === 'icon' && ( <IconToolSettings 
                    onChangeToolSettings={(key, value) => handleChange(key, value)}/>
                )}
                {type === 'radar' && ( <RadarToolSettings 
                    onChangeToolSettings={(key, value) => handleChange(key, value)}/>
                )}
        </div>
        
    );
};

export default ToolSettings;

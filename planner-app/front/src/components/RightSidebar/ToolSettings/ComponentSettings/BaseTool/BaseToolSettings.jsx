import React, { useState } from  'react';
import './baseArea.css';
import {useToolSettings} from '@/store/zustand/Toolbar/toolsettingStore';
import {useActiveToolStore} from "@/store/zustand/Toolbar/activeToolStore";

const BaseToolSettings = () =>{
    const activeTool = useActiveToolStore((state) => state.activeTool);
    const updateSettings = useToolSettings((state) => state.updateSettings);
    const textBody = useToolSettings((state) => state.settings[activeTool]?.textBody);

    const handleSettingChange = (name, value) => {
        updateSettings(activeTool, {[name]: value});
    };

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        if(!(/^[a-zA-Za]*$/.test(newValue) && newValue.length <= 1)){
            return;
        }
        const upperCaseValue = newValue.toUpperCase();
        handleSettingChange(e.target.name, upperCaseValue);
    }
    return (
        <div className="radar-settings">
            <label>Please type a point signature</label>
            <input
               className="radar-settings-input"
               type="text"
               name="textBody"
               value={textBody ?? ""}
               onChange={handleInputChange}
            />
        </div>
    );
};

export default BaseToolSettings;


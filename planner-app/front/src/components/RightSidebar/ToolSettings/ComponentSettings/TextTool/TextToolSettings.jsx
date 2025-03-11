import React from 'react';
import useActiveToolStore from '../../../../../store/zustand/Toolbar/activeToolStore';
import useToolSettings from '../../../../../store/zustand/Toolbar/toolsettingStore';

const TextToolSettings = () => {
    const activeTool = useActiveToolStore((state) => state.activeTool);
    const updateSettings = useToolSettings((state) => state.updateSettings);

    const handleSettingChange = (type, value) => {
        updateSettings(activeTool, {[type]: value})
    }

    return (
        <>
        <div className="text-settings-list">
        <h3>Type Message</h3>
            <input
                type="text"
                name="textBody"
                onChange={(e) => handleSettingChange(e.target.name, e.target.value)}
                />
        <h2>Text Size</h2>
        <input
                type="number"
                name="fontSize"
                onChange={(e) => handleSettingChange(e.target.name, Number(e.target.value))}
                />
        </div>
        </>
    );
}

export default TextToolSettings;
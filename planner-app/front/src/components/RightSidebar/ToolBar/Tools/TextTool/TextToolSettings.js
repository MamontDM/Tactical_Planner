import React from 'react';

const TextToolSettings = ({onChangeToolSettings}) => {

    const handleSettingChange = (type, value) => {
        onChangeToolSettings(type, value);
    };


    return (
        <>
        <div className="text-settings-list">
        <h3>Type Message</h3>
            <input
                type="text"
                data-type="textBody"
                onChange={(e) => handleSettingChange(e.target.dataset.type, e.target.value)}
                />
        <h2>Text Size</h2>
        <input
                type="number"
                data-type="fontSize"
                onChange={(e) => handleSettingChange(e.target.dataset.type, e.target.value)}
                />
        </div>
        </>
    );
}

export default TextToolSettings;
import React, { useState } from  'react';
import './baseArea.css';

const BaseToolSettings = ({onChangeToolSettings}) =>{
    const [textBody, setTextBody] = useState("");

    const handleSettingChange = (type, value) => {
        onChangeToolSettings(type, value);
    };

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        console.log(newValue.length);
        if(!(/^[a-zA-Za]*$/.test(newValue) && newValue.length <= 1)){
            return;
        }
        const upperCaseValue = newValue.toUpperCase();
        setTextBody(upperCaseValue);
        handleSettingChange(e.target.dataset.type, upperCaseValue);
    }
    return (
        <div className="radar-settings">
            <label>Please type a point signature</label>
             <input
                className="radar-settings-input"
                type="text"
                data-type="textBody"
                value={textBody}
                onChange={handleInputChange}
                />
        </div>
    );
};

export default BaseToolSettings;


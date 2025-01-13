import { useState, useEffect } from 'react';

const TextToolSettings = ({onChangeToolSettings}) => {
    const [textSetttings, setTextSettings] = useState({
        textBody: 'test',
        fontsize: '16px',
        color: '#fff000',
    });

    const handleSetFontSize = (value) => {
        setTextSettings((prev) => ({...prev, fontsize: value}));
    };
    const handleSetColor = (value) => {
        setTextSettings((prev) => ({...prev, color: value}));
    };

    const handleSetBody = (value) => {
        setTextSettings((prev) => ({ ...prev, textBody: value }));
    };

    useEffect(() => { 
        if(onChangeToolSettings){
            onChangeToolSettings(textSetttings);
        }
    }, [textSetttings]);


    return (
        <>
        <h2>Text Settings</h2>
        <div className="text-settings-list">
        <h3>Type Message</h3>
            <input
                type="text"
                onChange={(e) => handleSetBody(e.target.value)}
                defaultValue = {textSetttings.textBody}>
            </input>
        <h2>Text Size</h2>
        <input
                type="range"
                min='16px'
                max="152px"
                onChange={(e) => handleSetFontSize(e.target.value)}
                >
        </input>
        <h2>Text Color</h2>
        <input
                type="color"
                onChange={(e) => handleSetColor(e.target.value)}
                >
        </input>
        </div>
        </>
    );
}

export default TextToolSettings;
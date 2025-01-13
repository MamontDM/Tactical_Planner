import { useState, useEffect } from 'react';

const TextToolSettings = ({onChangeToolSettings}) => {
    const [textSetttings, setTextSettings] = useState({
        textBody: 'test',
        fontsize: '16px',
        color: '#fff000',
    });

    const handleSetFontSize = (value) => {
        console.log(value);
        setTextSettings((prev) => ({...prev, fontsize: value}));
    };
    const handleSetColor = (value) => {
        console.log(value);
        setTextSettings((prev) => ({...prev, color: value}));
    };

    const handleSetBody = (value) => {
        console.log(value);
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
                />
        <h2>Text Size</h2>
        <input
                type="range"
                min="16"
                max="152"
                onChange={(e) => handleSetFontSize(`${e.target.value}px`)}
                />
        <h2>Text Color</h2>
        <input
                type="color"
                onChange={(e) => handleSetColor(e.target.value)}
                />
        </div>
        </>
    );
}

export default TextToolSettings;
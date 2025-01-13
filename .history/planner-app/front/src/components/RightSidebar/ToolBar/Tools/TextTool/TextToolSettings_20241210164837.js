import { useState, useEffect } from 'react';

const TextToolSettings = ({onChangeToolSettings}) => {
    const [textSetttings, setTextSettings] = useState({
        textBody: 'test',
        fontSize: '16',
        textColor: '#fff000',
    });

    const handleSetFontSize = (value) => {
        setTextSettings((prev) => ({...prev, fontSize: value}));
    };
    const handleSetColor = (value) => {
        setTextSettings((prev) => ({...prev, textColor: value}));
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
                />
        <h2>Text Size</h2>
        <input
                type="range"
                min="5"
                max="90"
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
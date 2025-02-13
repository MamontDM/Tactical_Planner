import React, { useState, createContext, useMemo } from 'react';

const SettingContext = createContext(null);

export const SettingProvider = ({children}) => {
    const [toolSettings, setToolSettings] = useState({
        icon:  { color: '#fff000', shipType: null, label: 'USS' },
        line:  { color: 'rgba(135, 255, 0, 1)', lineWidth: 2 },
        tech:  { color: 'rgba(135, 255, 0, 1)', lineWidth: 2 },
        curve: { color: 'rgba(135, 255, 0, 1)', lineWidth: 2 },
        vision:{ color: 'rgba(135, 255, 0, 1)', lineWidth: 2 },
        radar: { color: 'rgba(135, 255, 0, 1)', lineWidth: 2, range: null },
        text:  { textBody: 'test', fontSize: '16', color: '#fff000'},
        base:  { textBody: 'A', 
                 color: 'rgba(136, 255, 0, 1)', 
                 lineWidth: 2, 
                 range: null, 
                 textColor: '#000',
                 fontSize: '25',  
            },
    });
    

    const contextValue = useMemo(() => 
        ({toolSettings, setToolSettings}), 
    [toolSettings]);


    return (
        <SettingContext.Provider 
            value={contextValue}
        >
            {children}
        </SettingContext.Provider>

    );
};

export default SettingContext;
import React, { createContext, useState, useCallback, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedMapId, setSelectedMapId] = useState(null);
    const [canDraw, setCanDraw] = useState(false); 


    const updateCanDraw = useCallback(() => {
        setCanDraw(isAuthenticated && selectedMapId !== null);
    }, [isAuthenticated, selectedMapId]);


    useEffect(() => {
        updateCanDraw();
    }, [isAuthenticated, selectedMapId, updateCanDraw]);

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                selectedMapId,
                setSelectedMapId,
                canDraw,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;

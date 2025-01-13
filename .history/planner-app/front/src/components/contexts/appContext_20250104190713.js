import React, { createContext, useState, useCallback } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Авторизация
    const [selectedMapId, setSelectedMapId] = useState(null);      // Выбранная карта
    const [canDraw, setCanDraw] = useState(false);                 // Доступность рисования

    // Проверяем доступность рисования
    const updateCanDraw = useCallback(() => {
        setCanDraw(isAuthenticated && selectedMapId !== null);
    }, [isAuthenticated, selectedMapId]);

    // Следим за изменением авторизации или карты
    React.useEffect(() => {
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

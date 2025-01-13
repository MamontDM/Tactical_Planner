import React, { createContext, useRef, useEffect } from 'react';

const CanvasContext = createContext(null);

export const CanvasContextProvider = ({ children }) => {
    const canvasRef = useRef(null);
    const backgroundCanvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const backgroundCanvas = backgroundCanvasRef.current;

       
        if (canvas && backgroundCanvas) {
            const scale = window.devicePixelRatio;
            canvas.width = 1253 * scale;
            canvas.height = 1200 * scale;
            backgroundCanvas.width = 1253 * scale;
            backgroundCanvas.height = 1200 * scale;
            const backgroundCtx = backgroundCanvas.getContext('2d');
           
        }
    }, []);

    const getCanvasContext = () => canvasRef.current?.getContext('2d');
    const getBackgroundCanvasContext = () => backgroundCanvasRef.current?.getContext('2d');

    return (
        <CanvasContext.Provider value={{ canvasRef, backgroundCanvasRef }}>
            {children}
        </CanvasContext.Provider>
    );
};

export default CanvasContext;

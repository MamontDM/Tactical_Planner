import React, { createContext, useRef, useEffect } from 'react';

const CanvasContext = createContext(null);

export const CanvasProvider = ({ children }) => {
    const canvasRef = useRef(null);
    const backgroundCanvasRef = useRef(null);
    const virtualCanvasRef = useRef(null);

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
            backgroundCtx.fillStyle = '#f0f0f0';
            backgroundCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
        }
      
            const virtualCanvas = document.createElement('canvas');
            virtualCanvas.width = canvas?.width || 0;
            virtualCanvas.height = canvas?.height || 0;
            virtualCanvasRef.current = virtualCanvas;

            return () => {
            if (virtualCanvasRef.current) {
                virtualCanvasRef.current = null;
            }
        };
    }, []);

    const getCanvasContext = () => canvasRef.current?.getContext('2d');
    const getBackgroundCanvasContext = () => backgroundCanvasRef.current?.getContext('2d');
    const getVirtualCanvasContext = () => virtualCanvasRef.current?.getContext('2d');
    const clearVirtualCanvas = () => {
        const ctx = virtualCanvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, virtualCanvasRef.current.width, virtualCanvasRef.current.height);
        }
    };
    
    return (
        <CanvasContext.Provider
            value={{
                canvasRef,
                backgroundCanvasRef,
                virtualCanvasRef,
                getCanvasContext,
                getBackgroundCanvasContext,
                getVirtualCanvasContext,
            }}
        >
            {children}
        </CanvasContext.Provider>
    );
};

export default CanvasContext;

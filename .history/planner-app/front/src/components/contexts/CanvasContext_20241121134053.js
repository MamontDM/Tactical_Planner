import React, { createContext, useRef, useEffect } from 'react';

const CanvasContext = createContext(null);

export const CanvasProvider = ({ children }) => {
    const canvasRef = useRef(null);
    const backgroundCanvasRef = useRef(null);
    const drawingCanvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const backgroundCanvas = backgroundCanvasRef.current;
        const drawingCanvas = drawingCanvasRef.current;

        if (canvas && backgroundCanvas && drawingCanvas) {
            const scale = window.devicePixelRatio;

            canvas.width = 1253 * scale;
            canvas.height = 1200 * scale;

            backgroundCanvas.width = 1253 * scale;
            backgroundCanvas.height = 1200 * scale;
            const backgroundCtx = backgroundCanvas.getContext('2d');
            backgroundCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

            drawingCanvas.width = 1253 * scale;
            drawingCanvas.height = 1200 * scale;
            const drawingCtx = drawingCanvas.getContext('2d');
            drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
        }
    }, []);

    const getCanvasContext = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.scale(scale, scale);
        ctx.imageSmoothingEnabled = false;
        return ctx;
    };
    const getDrawingCanvasContext = () => {
        const ctx = drawingCanvasRef.current.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        return ctx;
    };

    const getBackgroundCanvasContext = () => backgroundCanvasRef.current?.getContext('2d');

    const clearDrawingCanvas = () => {
        const ctx = drawingCanvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, drawingCanvasRef.current.width, drawingCanvasRef.current.height);
        }
    };

    return (
        <CanvasContext.Provider
            value={{
                canvasRef,
                backgroundCanvasRef,
                drawingCanvasRef,
                getCanvasContext,
                getBackgroundCanvasContext,
                getDrawingCanvasContext,
                clearDrawingCanvas,
            }}
        >
            {children}
        </CanvasContext.Provider>
    );
};

export default CanvasContext;

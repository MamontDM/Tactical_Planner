import React, { createContext, useRef, useEffect , useState, useCallback } from 'react';
import {BgCanvas} from '../../assets/exportUImedia';

const CanvasContext = createContext(null);

export const CanvasProvider = ({ children }) => {
    const canvasRef = useRef(null);
    const backgroundCanvasRef = useRef(null);
    const drawingCanvasRef = useRef(null);
    const [scale, setScale] = useState(1);

    const getDefaultBackgroundStyles = () => {
        
        const backgroundCtx = getBackgroundCanvasContext();
        const bgImage = new Image();

        bgImage.src = BgCanvas;
        bgImage.onload = () => {
            const canvas = backgroundCanvasRef.current;
            if (!canvas) return;
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            backgroundCtx.clearRect(0, 0, canvasWidth, canvasHeight);
            backgroundCtx.drawImage(bgImage, 0, 0, canvasWidth, canvasHeight)
        };
    };


    useEffect(() => {
        const canvasWrapper = document.querySelector('.canvas-wrapper');
        const canvas = canvasRef.current;
        const backgroundCanvas = backgroundCanvasRef.current;
        const drawingCanvas = drawingCanvasRef.current;
        if (canvas && backgroundCanvas && drawingCanvas && canvasWrapper) {
            const deviceScale = window.devicePixelRatio;
            setScale(deviceScale);

            const wrapperWidth = canvasWrapper.clientWidth;
            const wrapperHeight = canvasWrapper.clientHeight;

            const originalWidth = 1253;
            const originalHeight = 1200;
            const aspectRatio = originalWidth / originalHeight;
            let width = wrapperWidth;
            let height = width / aspectRatio; 

            if (height > wrapperHeight) {
                height = wrapperHeight;
                width = height * aspectRatio;
            }
            [canvas, backgroundCanvas, drawingCanvas].forEach((canvasElement) => {
                canvasElement.width = width;
                canvasElement.height = height;
                canvasElement.style.width = '100%';
                canvasElement.style.height = '100%';

                const ctx = canvasElement.getContext("2d");
                ctx.imageSmoothingEnabled = false;
            });
            Object.assign(backgroundCanvas.style, getDefaultBackgroundStyles());
        }
    }, []);

    const getCanvasContext = useCallback(() => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        return ctx;
    }, [canvasRef, scale]);
    
    const getDrawingCanvasContext = useCallback(() => {
        const ctx = drawingCanvasRef.current.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        return ctx;
    }, [drawingCanvasRef]);
    
    const getBackgroundCanvasContext = useCallback(() => {
        return backgroundCanvasRef.current?.getContext('2d');
    }, [backgroundCanvasRef]);
    
    const clearDrawingCanvas = useCallback(() => {
        const ctx = drawingCanvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, drawingCanvasRef.current.width, drawingCanvasRef.current.height);
        }
    }, [drawingCanvasRef]);
    
    const clearMainCanvas = useCallback(() => {
        const ctx = getCanvasContext();
        if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    }, [getCanvasContext, canvasRef]);
    
const clearBackground = useCallback(() => {
        const backgroundCanvas = backgroundCanvasRef.current;
        if (backgroundCanvas) {
            Object.assign(backgroundCanvas.style, getDefaultBackgroundStyles());
        }
    }, [backgroundCanvasRef]);


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
                clearMainCanvas,
                clearBackground,
            }}
        >
            {children}
        </CanvasContext.Provider>
    );
};

export default CanvasContext;

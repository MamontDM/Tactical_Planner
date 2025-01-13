import React, { useContext } from 'react'
import CanvasContext from '../../../contexts/CanvasContext';

const DownLoadTool = ({onDeactivate, isAcivate}) => {
    const { canvasRef, backgroundCanvasRef, drawingCanvasRef, getDrawingCanvasContext } = useContext(CanvasContext);


    const mergeCanvases = (canvasRef, backgroundCanvasRef, drawingCanvasRef, fileName) => {
        
        const temporaryCanvasCtx = getDrawingCanvasContext();
        temporaryCanvasCtx.drawImage(backgroundCanvasRef, 0, 0);
        temporaryCanvasCtx.drawImage(canvasRef, 0, 0);
        downloadCanvas(fileName, drawingCanvasRef);
    }
    const downloadCanvas = (fileName, mergedCanvas) => {
        const link = document.createElement('a');
    }
};

export default DownLoadTool;
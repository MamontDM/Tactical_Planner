import React, { useContext, useEffect } from 'react'
import CanvasContext from '../../../contexts/CanvasContext';

const DownLoadTool = ({onDeactivate, isAcivate}) => {
    const { canvasRef, backgroundCanvasRef, drawingCanvasRef, getDrawingCanvasContext } = useContext(CanvasContext);

    useEffect = (() =>{
        if(!isAcivate) return;


        mergeCanvases();

    }, [isAcivate, downloadCanvas])

    const mergeCanvases = (canvasRef, backgroundCanvasRef, drawingCanvasRef, fileName) => {
        
        const temporaryCanvasCtx = getDrawingCanvasContext();
        temporaryCanvasCtx.drawImage(backgroundCanvasRef, 0, 0);
        temporaryCanvasCtx.drawImage(canvasRef, 0, 0);
        downloadCanvas(fileName, drawingCanvasRef);
    }
    const downloadCanvas = (fileName, mergedCanvas) => {
        const link = document.createElement('a');
        link.href = mergedCanvas.toDataURL('image/png');
        link.download = filename;
        linck.click();
    }
    return ReactDOM.createPortal(
        <div className="saveModalForm">
            <label>
                <h2>Type a name...</h2>
            </label>


        </div>
    )
};

export default DownLoadTool;
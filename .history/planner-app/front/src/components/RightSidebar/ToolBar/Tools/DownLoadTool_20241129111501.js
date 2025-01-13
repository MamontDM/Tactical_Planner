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
                <h2>Download and Share</h2>
            </label>
            <div className="modal-style">
                <input
                type="text"
                onChange={(e) => handleSetName(e.taget.value)}
                placehodler="Type a file name..."   
                >
                </input>
                <button className="saveModal-button save">Save</button>
            </div>
        </div>
    )
};

export default DownLoadTool;
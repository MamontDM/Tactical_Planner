import React, { useContext, useRef } from 'react'
import ReactDOM from 'react-dom'
import CanvasContext from '../../../contexts/CanvasContext';

const DownLoadTool = ({onDeactivate, isActive}) => {
    const { canvasRef, backgroundCanvasRef, drawingCanvasRef, getDrawingCanvasContext } = useContext(CanvasContext);
    const fileName = useRef('planner-app'); 

    const handleSetName = (value) => {
        if(value){
            fileName.current = value;
        }
    };

    const handleDownload = () => {
        mergeCanvases();
        downloadCanvas();     
        if(onDeactivate) onDeactivate();   
    };

    const mergeCanvases = () => {
        const temporaryCanvasCtx = getDrawingCanvasContext();
        temporaryCanvasCtx.drawImage(backgroundCanvasRef, 0, 0);
        temporaryCanvasCtx.drawImage(canvasRef, 0, 0);
        downloadCanvas(fileName, drawingCanvasRef);
    }

    const downloadCanvas = () => {
        const link = document.createElement('a');
        link.href = mergedCanvas.toDataURL('image/png');
        link.download = fileName;
        link.click();
    }
    
    return ReactDOM.createPortal(
        <div className="saveModalForm">
            <label>
                <h2>Download and Share</h2>
            </label>
            <div className="modal-style">
                <input
                type="text"
                onChange={(e) => handleSetName(e.target.value)}
                placehodler="Type a file name..."   
                />
                <button className="saveModal-button save"
                        onClick={() => handleDownload()}>
                        Save
                </button>
            </div>
        </div>
    )
};

export default DownLoadTool;
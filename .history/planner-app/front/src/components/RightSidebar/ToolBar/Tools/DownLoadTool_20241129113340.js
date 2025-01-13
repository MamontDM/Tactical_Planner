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
        if(onDeactivate) onDeactivate();   
    };

    const mergeCanvases = () => {
        const temporaryCanvasCtx = getDrawingCanvasContext();
        temporaryCanvasCtx.drawImage(backgroundCanvasRef, 0, 0);
        temporaryCanvasCtx.drawImage(canvasRef, 0, 0);
        downloadCanvas(fileName.current, drawingCanvasRef.current);
    }

    const downloadCanvas = (fileName.current, drawingCanvasRef.current) => {
        const link = document.createElement('a');
        link.href = drawingCanvasRef.current.toDataURL('image/png');
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
                placeholder="Type a file name..."   
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
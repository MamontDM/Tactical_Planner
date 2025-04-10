import React, { useContext, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import CanvasContext from '../../../../contexts/CanvasContext';
import { useMapLegendStore } from '../../../../../store/zustand/MapLegend/mapLegendStore';

const DownLoadTool = ({onDeactivate, isActive}) => {
    const { canvasRef, backgroundCanvasRef, drawingCanvasRef, getDrawingCanvasContext, mapInfoCanvasRef, getMapInfoCanvasContext } = useContext(CanvasContext);
    
    const mapName = useMapLegendStore((state) => state.activeMap || 'planner-app'); 
    const fileName = useRef(mapName);

    useEffect(() => {
        fileName.current = mapName;
    }, [mapName, isActive]);



    const handleSetName = (value) => {
        if(value){
            fileName.current = value || mapName;
        }
    };
   

    const handleDownload = () => {
        mergeCanvases();
        if(onDeactivate) onDeactivate();   
    };

    const mergeCanvases = () => {
        const temporaryCanvas = drawingCanvasRef.current;
        const temporaryCanvasCtx = getDrawingCanvasContext();
        temporaryCanvasCtx.drawImage(backgroundCanvasRef.current, 0, 0);
        temporaryCanvasCtx.drawImage(canvasRef.current, 0, 0);
        temporaryCanvasCtx.drawImage(mapInfoCanvasRef.current, 0, 0);
        downloadCanvas(fileName.current, temporaryCanvas);
        temporaryCanvasCtx.clearRect(0, 0, temporaryCanvas.width, temporaryCanvas.height);
    }

    const downloadCanvas = (fileName, mergedCanvas) => {
        const link = document.createElement('a');
        link.href = mergedCanvas.toDataURL('image/png');
        link.download = fileName;
        link.click();
    }
    if (!isActive) return null;

    return ReactDOM.createPortal(
        <div className={`modal-overlay ${isActive ? 'show' : ''}`} 
             onClick={onDeactivate}
             >
                <div className="modal-content"
                onClick={(e) => e.stopPropagation()}>
                <label>
                    <h2>Download and Share</h2>
                </label>
                <input
                    type="text"
                    defaultValue={mapName}
                    onChange={(e) => handleSetName(e.target.value)}
                    placeholder={mapName}   
                />
                <button 
                    className="saveModal-button-save"
                    onClick={handleDownload}
                >
                    Save
                </button>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default DownLoadTool;
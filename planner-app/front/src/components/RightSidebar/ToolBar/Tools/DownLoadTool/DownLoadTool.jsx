import React, { useContext, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import CanvasContext from '../../../../contexts/CanvasContext';
import { useMapLegendStore } from '../../../../../store/zustand/MapLegend/mapLegendStore';
import { downloadCanvasAsImage, mergeCanvases } from '../../../../../utils/MergeCanvasFactory/canvasMergin';

const DownLoadTool = ({onDeactivate, isActive}) => {
    const { canvasRef, backgroundCanvasRef, drawingCanvasRef, getDrawingCanvasContext, mapInfoCanvasRef } = useContext(CanvasContext);
    
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
        const mergedCanvases = mergeCanvases([
            backgroundCanvasRef.current,
            canvasRef.current,
            mapInfoCanvasRef.current
        ]);
        downloadCanvasAsImage(fileName.current, mergedCanvases ); 
        if(onDeactivate) onDeactivate();   
    };

    
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
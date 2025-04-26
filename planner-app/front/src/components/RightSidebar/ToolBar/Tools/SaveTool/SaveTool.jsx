import React, {useContext, useEffect, useRef} from 'react'
import { useMapStore } from '../../../../../store/zustand/MapStore/mapStore';
import { useNotificationStore } from '../../../../../store/zustand/UserModalWindow/userModalController';
import CanvasContext from '../../../../contexts/CanvasContext';
import { mergeCanvases } from '../../../../../utils/MergeCanvasFactory/canvasMergin';
import { useMapLegendStore } from '../../../../../store/zustand/MapLegend/mapLegendStore';
import { useMapActionManager } from '../../../../../hooks/useMapActionManager';


const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : import.meta.env.VITE_API_BASE_URL;

const SaveTool = ({isActive, onDeactivate}) => {
    const { handleSaveMap } = useMapActionManager();
    const { canvasRef, backgroundCanvasRef, drawingCanvasRef, getDrawingCanvasContext, mapInfoCanvasRef } = useContext(CanvasContext);
    const hasSaved = useRef(false);
    const getSnapShot = useMapStore((state) => state.getCurrentSnapShot);
    const getLegendSnapShot = useMapLegendStore((state) => state.getLegendSnapShot);
   

    useEffect(() => {
        if (!isActive || hasSaved.current) return;
       hasSaved.current = true;
       const snapshot = getSnapShot();
       const legendSnapshot = getLegendSnapShot();

       if (!snapshot || !backgroundCanvasRef.current || !canvasRef.current || !mapInfoCanvasRef.current) return;


       const miniCanvas = mergeCanvases([
        backgroundCanvasRef.current,
        canvasRef.current,
        mapInfoCanvasRef.current
       ], 300, 300);

       const miniImg = miniCanvas.toDataURL('image/jpeg');
      
       const snapshotsWithMini = { 
        ...snapshot,
        ...legendSnapshot,
        mini: miniImg
       };

       handleSaveMap(snapshotsWithMini);
       onDeactivate();
      
    }, [isActive, getSnapShot, getLegendSnapShot, handleSaveMap, onDeactivate])

    return null;
};

export default SaveTool;


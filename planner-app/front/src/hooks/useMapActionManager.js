import { useMapStore } from "@/store/zustand/MapStore/mapStore";
import { useContext, useMemo, useCallback } from "react";
import CanvasContext from "../components/contexts/CanvasContext";
import { useMapLegendStore } from "@/store/zustand/MapLegend/mapLegendStore";
import { useNotificationStore } from "@/store/zustand/UserModalWindow/userModalController";
import { useMapStoreListDb } from "@/store/zustand/MapStore/mapStoreDbList";
import { useMapSyncManager } from "./useMapSyncManager";


const API_BASE_URL =
        process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : import.meta.env.VITE_API_BASE_URL;

export const useMapActionManager = () => {
    const addMap = useMapStore((state) => state.addMap);
    const removeMap = useMapStore((state) => state.removeMap);
    const removeFromMapList = useMapStoreListDb.getState().removeFromMapList;
    const selectMap = useMapStore((state) => state.selectMap);
    const loadFromSnapshot = useMapLegendStore((state) => state.loadFromSnapshot)
    const notification = useNotificationStore.getState().addNotification; 
    const { clearBackground, clearMainCanvas, backgroundCanvasRef, getBackgroundCanvasContext } = useContext(CanvasContext);
    const { syncMapsFromDb } = useMapSyncManager();

    const renderMap = (source) => {
        clearBackground();
         const backCanvas = backgroundCanvasRef.current;
         const ctx = getBackgroundCanvasContext();

         if (source) {
            const bgImage = new Image();
            bgImage.src = source;
 
            bgImage.onload = () =>{
                ctx.drawImage(bgImage, 0, 0, backCanvas.width, backCanvas.height);
            };
         }
     };


     const handleSelectMap = useCallback((item) => {
        if(!item) {
            selectMap(null);
            clearBackground();
            clearMainCanvas();
            return;
        }
            addMap(item);
            selectMap(item.id);
            renderMap(item.url);
        if(item.activeMap){
            loadFromSnapshot(item);
        }
     },[]);

 
     const handleRemoveMap = useCallback(async (mongoId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/mapstorage/deletemap/${mongoId}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Deleting error:", errorData.error);
                return;
            }
            removeMap(mongoId);
            removeFromMapList(mongoId);
            clearMainCanvas();
            clearBackground();
            notification("Map is successfull deleted");
        } catch (err) {
            console.error("Network Error", err.message);
        }
    },[]);

    const handleSaveMap = useCallback(async (snapshot) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/mapstorage/savemap`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {"Content-Type" : 'application/json'},
                    body: JSON.stringify({ snapshot })
            });
            if(!response.ok) {
                const errorData = await response.json();
                console.error("Saving error", errorData);
                return;
            }

            await syncMapsFromDb();
            notification("Map is successfull saved!")
        } catch (error) {
            console.error("Network Error:", error.message);
        }
    },[]);


 return  useMemo(() => ({ 
    handleSelectMap, 
    handleRemoveMap, 
    handleSaveMap 
}),[handleSelectMap, handleRemoveMap, handleSaveMap]);
};
import { useEffect, useRef, useContext } from "react";
import { useMapLegendStore } from "@/store/zustand/MapLegend/mapLegendStore";
import CanvasContext from "../../contexts/CanvasContext";
import { useMapStore } from "../../../store/zustand/MapStore/mapStore";
import { drawStaticObjects } from "../../../factories/CanvasRender";


const MapGrid = () => {
    const { mapInfoCanvasRef, clearMapInfoCanvasContext } = useContext(CanvasContext);
    const currentProps = useMapLegendStore((s) => s.currentProps);
    const isActive = useMapStore((state) => state.selectedMapId);
    
   

    useEffect(()=>{
        if(!isActive){
            clearMapInfoCanvasContext();
            return;
        }

        if(!currentProps) {
            console.log('called');            
            clearMapInfoCanvasContext();
            return;
        };

        const { baseAreaCategory, activeCategories } = currentProps;

        const objectsToDraw = [];

        if(baseAreaCategory){
            const baseObject = currentProps.baseArea[baseAreaCategory];
            objectsToDraw.push(...baseObject);
        }
        if (activeCategories.length > 0) {
            const mapInfoObject = activeCategories
            .map(key => currentProps.mapInfo[key])
            .filter(Boolean);
            objectsToDraw.push(...mapInfoObject);
        }
       drawStaticObjects(mapInfoCanvasRef.current, objectsToDraw);

    },[currentProps, isActive])

    return null;
};

export default MapGrid;

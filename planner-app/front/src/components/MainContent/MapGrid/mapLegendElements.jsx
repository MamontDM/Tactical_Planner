import { useEffect, useRef, useContext } from "react";
import { useMapLegendStore } from "@/store/zustand/MapLegend/mapLegendStore";
import CanvasContext from "../../contexts/CanvasContext";
import { drawObjects } from "../../../factories/CanvasRender";


const MapGrid = () => {
    const { mapInfoCanvasRef, clearMapInfoCanvasContext } = useContext(CanvasContext);
    const currentProps = useMapLegendStore((s) => s.currentProps);
    const baseAreaCategory = currentProps?.baseAreaCategory;
    
    console.log(currentProps);
   

    useEffect(()=>{
        if(!currentProps) {
            clearMapInfoCanvasContext();
            return;
        };

        if(baseAreaCategory === null){
            clearMapInfoCanvasContext()
        }else {
            const objects = currentProps.baseArea[baseAreaCategory];
            drawObjects(mapInfoCanvasRef.current, objects);
        }
    },[baseAreaCategory, currentProps])

    return null;
};

export default MapGrid;

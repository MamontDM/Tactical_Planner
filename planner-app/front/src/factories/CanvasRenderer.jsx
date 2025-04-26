import { useEffect, useContext } from "react";
import { drawObjects } from "./CanvasRender"; 
import CanvasContext from "../components/contexts/CanvasContext";
import { useMapStore } from "@/store/zustand/MapStore/mapStore"

const CanvasRenderer = () => {
  const { canvasRef } = useContext(CanvasContext);
  const objects = useMapStore((state) => state.maps[state.selectedMapId]?.objects);

  useEffect(() => {
    if (!canvasRef?.current || !Array.isArray(objects)) return;
    drawObjects(canvasRef.current, objects);
  }, [canvasRef, objects]);

  return null;
};

export default CanvasRenderer;

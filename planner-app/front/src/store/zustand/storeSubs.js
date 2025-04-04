import { useMapStore } from '@/store/zustand/MapStore/mapStore';
import { useMapLegendStore } from './MapLegend/mapLegendStore';
import { useActiveToolStore } from "@/store/zustand/Toolbar/activeToolStore";

export const connectStores = () => {

  const unsubscribe = useMapStore.subscribe(
    (state) => state.selectedMapId,
      (selectedMapId) => {
        const { maps } = useMapStore.getState();
        const activeMapName = maps[selectedMapId]?.name;
        if (activeMapName) {
           useMapLegendStore.getState().setActiveMapName(activeMapName);
          }
          if(activeMapName){
            useActiveToolStore.getState().clearActiveTool();
          }
        },
      );
  return unsubscribe;

};

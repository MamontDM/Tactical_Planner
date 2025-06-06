import {create} from "zustand";
import mapPresets from "../../../components/RightSidebar/MapsLegend/mapPresset.json";


export const useMapLegendStore = create((set, get) => ({
    activeMap: "",
    mapData: {},
    currentProps: null,

    setActiveMapName: (name) => {
        const preset = mapPresets[name];
        if (!preset) {
          console.log({name});
          console.log(preset);
          console.warn(`Map ${name} is not found`);
          get().resetActiveMap();
          return;
        }
        set((state) => {
            const updatedMapData = {
                ...state.mapData,
                [name]: {
                    ...(state.mapData[name] || {}),
                    ...preset,
                    activeCategories: state.mapData[name]?.activeCategories || [],
                    baseAreaCategory: state.mapData[name]?.baseAreaCategory || null,
                },
            };
            return {
                activeMap: name,
                mapData: updatedMapData,
                currentProps: updatedMapData[name],
            };
        });
      },
      

    setActiveCategory: (category) => {
        const { activeMap, mapData} = get();
        const current = mapData[activeMap]?.activeCategories || [];
        const isActive = current.includes(category);
        const update = isActive
        ? current.filter((c) => c !== category)
        : [...current, category];

        const newMap = {
            ...mapData,
            [activeMap]: {
                ...mapData[activeMap],
                activeCategories: update
            },
        };
        set({
            mapData: newMap,
            currentProps: newMap[activeMap],
        });
    },

    loadFromSnapshot: (snapshot) => {
      const {name, mapData } = snapshot || {};
      if(!name && !mapData) return;
      set({
        activeMap: name,
        mapData,
        currentProps: mapData[name]
      })
    },

    getLegendSnapShot: () => {
      const { activeMap, mapData } = get();
      const snapshot = {
        activeMap: activeMap,
        mapData: mapData,
      }
      return snapshot;
    },

    setBaseAreaCategory: (category) => {
        const { activeMap, mapData } = get();
        const current = mapData[activeMap]?.baseAreaCategory || null;
    
        const updated = current === category ? null : category;
    
        const newMap = {
          ...mapData,
          [activeMap]: {
            ...mapData[activeMap],
            baseAreaCategory: updated,
          },
        };
    
        set({
          mapData: newMap,
          currentProps: newMap[activeMap],
        });
      },
      resetActiveMap:  () => {
        set({
            activeMap: "",
            currentProps: null,
        });
      },

    }));
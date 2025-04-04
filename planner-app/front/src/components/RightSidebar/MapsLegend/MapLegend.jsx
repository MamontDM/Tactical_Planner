import React from "react"
import { useMapLegendStore } from "@/store/zustand/MapLegend/mapLegendStore";
import './mapLegendStyle.css';



const MapLegend = () => {
    const { setBaseAreaCategory } = useMapLegendStore();
    const currentProps = useMapLegendStore((s) => s.currentProps);


    if (!currentProps || !currentProps.baseArea) return (
        <>
        <h1>Support information</h1>
        <fieldset>
                <legend>Pick some additional info:</legend>
                <h3>Temporary unaveliable for this map</h3>
        </fieldset>
        </>
    );


    const baseAreaCategory = currentProps?.baseAreaCategory;
    const baseAreaPreset = Object.keys(currentProps.baseArea);

    const handleRenderAreas = (category) => {
        if(baseAreaCategory === category){
            setBaseAreaCategory(null)
        }else {
            setBaseAreaCategory(category);
        }
    };

    
    return (
        <> 
            <h1>Support information</h1>
                <fieldset>
                    <h3> Base setup</h3>
                    <legend>Pick some additional info:</legend>
                  {baseAreaPreset.map((item, index) => (
                    <div 
                    className="preset-item" 
                    key={index}>
                    <label>
                        {item}
                    </label>
                        <input
                            type="checkbox"
                            value={item}
                            checked={baseAreaCategory === item}
                            onChange={(e) => handleRenderAreas(e.target.value)}
    >
                        </input>
                    </div>
                  ))}
                <h3> Support info</h3>
                </fieldset>
        </>
    )
};


export default MapLegend;
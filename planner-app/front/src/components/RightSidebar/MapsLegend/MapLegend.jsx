import React from "react"
import { useMapLegendStore } from "@/store/zustand/MapLegend/mapLegendStore";
import './mapLegendStyle.css';



const MapLegend = () => {
    const { setBaseAreaCategory, setActiveCategory  } = useMapLegendStore();
    const currentProps = useMapLegendStore((s) => s.currentProps);

    if (!currentProps || !currentProps.baseArea) return (
        <>
        <fieldset>
                <legend>Pick some additional info:</legend>
                <h3>Temporary unaveliable for this map</h3>
        </fieldset>
        </>
    );

  const { baseAreaCategory, activeCategories: mapInfoCategory } = currentProps;
  const baseAreaKeys = Object.keys(currentProps.baseArea);
  const mapInfoKeys = Object.keys(currentProps.mapInfo);


  const handleCheckboxChange = (category, type) => {
    if (type === "area") {
      setBaseAreaCategory(baseAreaCategory === category ? null : category);
    } else if (type === "info") {
      setActiveCategory(mapInfoCategory[category] ? null : category);
    }
  };



  const renderCheckbox = (item, type) => {
    const isChecked =
      type === "area"
        ? baseAreaCategory === item
        : mapInfoCategory.includes(item);
        

    return (
      <div className="preset-item" key={item}>
        <input
          type="checkbox"
          value={item}
          checked={isChecked}
          onChange={() => handleCheckboxChange(item, type)}
        />
        <label>{item}</label>
      </div>
    );
  };



    
  return (
    <>
      <fieldset>
        <legend>Pick some additional info:</legend>

        <h3>Base setup</h3>
        {baseAreaKeys.map((item) => renderCheckbox(item, "area"))}

        <h3>Support info</h3>
        {mapInfoKeys.map((item) => renderCheckbox(item, "info"))}
      </fieldset>
    </>
  );
};


export default MapLegend;
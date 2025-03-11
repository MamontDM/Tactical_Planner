import React, {useState} from 'react';
import styles from './commonSettings.module.css';
import useToolSettings from '../../../../store/zustand/Toolbar/toolsettingStore';
import useActiveToolStore from '../../../../store/zustand/Toolbar/activeToolStore';


const ColorAndWidthSettings = ({  }) => {
    const activeTool = useActiveToolStore((state) => state.activeTool);
    const updateSettings = useToolSettings((state) => state.updateSettings);
    const color = useToolSettings((state) => state.settings[activeTool]?.color || "rgba(135, 255, 0, 1)");
    const lineWidth = useToolSettings((state) => state.settings[activeTool]?.lineWidth || 2);
    const [sliderValue, setSliderValue] = useState(50);
    const [alpha, setAlpha] = useState(1);

    const gradientColors = [
        { r: 255, g: 0, b: 0, a: 1},
        { r: 255, g: 255, b: 0, a: 1 }, 
        { r: 0, g: 255, b: 0, a: 1 },  
        { r: 0, g: 0, b: 255, a: 1 } 
    ]

    const calculateColor = (value) => {
        const maxIndex = gradientColors.length -1;
        const section = Math.min(Math.floor((value / 100) * maxIndex), maxIndex - 1);
        const percentage = (value / 100) * maxIndex - section;
        const start = gradientColors[section];
        const end = gradientColors[section + 1];

        const r = Math.round(start.r + (end.r - start.r) * percentage);
        const g = Math.round(start.g + (end.g - start.g) * percentage);
        const b = Math.round(start.b + (end.b - start.b) * percentage);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    const handleSliderChange = (e) => {
        const newValue = e.target.value;
        setSliderValue(newValue);
        const newColor = calculateColor(newValue);
        updateSettings(activeTool, {color: newColor});
        document.documentElement.style.setProperty("--thumb-color", newColor);
    }

    const handleWidthChange = (e) => {
        const newWidth = e.target.value;
        updateSettings(activeTool, {lineWidth: newWidth});
    }


    return ( 
        <div className={styles["gradient-section"]}>
            <input
                type="range"
                min="0"
                max="100"
                className={styles["color-gradient"]}
                value={sliderValue}
                onChange={handleSliderChange}
                style={{
                    backgroundColor: color,
                }}
            />
           {activeTool !== "text" &&
           <>
            <h4>Line Width</h4>
            <input
                type="range"
                min="1"
                max="10"
                value={lineWidth}
                className={styles["line-width"]}
                onChange={handleWidthChange}
            />
            </>
            }

        </div>
    )
};

export default ColorAndWidthSettings;
import React, {useState} from 'react';
import './inputColorSlider.css';


const GradiendColorInput = () => {
    const [color, setColor] = useState('rgb(135, 255, 0)');
    const gradientColors = [
        { r: 255, g: 0, b: 0 },
        { r: 255, g: 255, b: 0 }, 
        { r: 0, g: 255, b: 0 },  
        { r: 0, g: 0, b: 255 } 
    ]

    const calculateColor = (value) => {

        const section = Math.floor((value / 100) * (gradientColors.length -1));
        const percentage = (value / 100) * (gradientColors.length - 1) - section;
        const start = gradientColors[section];
        const end = gradientColors[section + 1];


        const r = Math.round(start.r + (end.r - start.r) * percentage);
        const g = Math.round(start.g + (end.g - start.g) * percentage);
        const b = Math.round(start.b + (end.b - start.b) * percentage);

        return `rgb(${r}, ${g}, ${b})`;
    }

    const handleSliderChange = (e) => {
        const newValue = e.target.value;
        const newColor = calculateColor(newValue);
        setColor(newColor); 
    }

    return ( 
        <div className="gradient-section">
            <input
                type="range"
                min="0"
                max="20"
                value="255"
                onChange={handleSliderChange}
            />
        <div className="color-indicator"
            style={{
                backgroundColor: color,
            }}>
        </div>
            <p>Выбранный цвет: <strong>{color}</strong></p>
        </div>

    )
};

export default GradiendColorInput;
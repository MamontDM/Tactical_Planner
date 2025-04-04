import React, {useContext} from 'react';
import './MainContent.css';
import CanvasContext from '../contexts/CanvasContext';
import MapLegend from './MapGrid/mapLegendElements';



const CanvasElements = () =>{
    const { canvasRef, backgroundCanvasRef, drawingCanvasRef, mapInfoCanvasRef } = useContext(CanvasContext);
    
    return(
        <div className="canvas-wrapper">
            <canvas ref={backgroundCanvasRef} id="backgroundCanvas"></canvas>
            <canvas ref={canvasRef} id="canvas"></canvas>
            <canvas ref={drawingCanvasRef} id="drawingCanvas"></canvas>
            <canvas ref={mapInfoCanvasRef} id="infoCanvas"></canvas>
            <MapLegend />
        </div>
    );
};

export default CanvasElements;
import React, {useContext} from 'react';
import './MainContent.css';
import CanvasContext from '../contexts/CanvasContext';



const CanvasElements = () =>{
    const { canvasRef, backgroundCanvasRef, drawingCanvasRef } = useContext(CanvasContext);
    return(
        <div className="canvas-wrapper">
            <canvas ref={backgroundCanvasRef} id="backgroundCanvas"></canvas>
            <canvas ref={canvasRef} id="canvas"></canvas>
            <canvas ref={drawingCanvasRef} id="drawingCanvas"></canvas>
        </div>
    );
};

export default CanvasElements;
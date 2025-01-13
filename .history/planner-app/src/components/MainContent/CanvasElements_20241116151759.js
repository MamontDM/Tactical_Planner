import React, {useContext} from 'react';
import CanvasContext from '../contexts/CanvasContext';
import CanvasRenderer from '../../factories/CanvasRender';

const CanvasElements = ({children}) =>{
    const { canvasRef, backgroundCanvasRef } = useContext(CanvasContext);
    return(
        <div className="canvas-wrapper">
            <canvas ref={backgroundCanvasRef} id="backgroundCanvas"><h2>Canvas 1</h2></canvas>
            <canvas ref={canvasRef} id="canvas"><h2>Canvas 2</h2></canvas>
        </div>
    );
};

export default CanvasElements;
import React, { useContext} from 'react';
import CanvasContext from '../../../../contexts/CanvasContext';


const TextTool = ({isActive, onChangeToolSettings}) => {
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);

};


export default TextTool;
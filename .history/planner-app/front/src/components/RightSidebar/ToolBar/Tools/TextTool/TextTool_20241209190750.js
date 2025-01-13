import React, { useContext} from 'react';
import CanvasContext from '../../../../contexts/CanvasContext';
import { useObjects } from '../../../../../hooks/useObjects';


const TextTool = ({isActive,settings}) => {
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const {objects, dispatch} = useObjects();
    const textBody = useRef(null);
    const fontSize = useRef(null);
    const fontColor = useRef(null);
};


export default TextTool;
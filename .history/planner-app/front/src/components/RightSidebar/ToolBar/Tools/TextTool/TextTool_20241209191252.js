import React, { useContext, useRef, useEffect} from 'react';
import CanvasContext from '../../../../contexts/CanvasContext';
import { useObjects } from '../../../../../hooks/useObjects';


const TextTool = ({isActive, settings}) => {
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const {objects, dispatch} = useObjects();
    const textBody = useRef(null);
    const fontSize = useRef(null);
    const fontColor = useRef(null);
   
    useEffect(() => {
        if (settings) {
            if (settings.textBody) {
                textBody.current = settings.textBody;
            }
            if (settings.fontColor) {
                fontSize.current = settings.fontColor;
            }
            if (settings.fontSize) {
                fontSize.current = settings.fontSize;
            }
        }
    }, [settings]);
};


export default TextTool;
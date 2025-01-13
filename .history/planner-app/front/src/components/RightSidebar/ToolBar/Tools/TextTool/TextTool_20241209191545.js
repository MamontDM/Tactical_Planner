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
        if (isActive) {
            if (settings.textBody) {
                console.log(settings.textBody);
                textBody.current = settings.textBody;
            }
            if (settings.fontColor) {
                console.log(settings.fontColor);
                fontColor.current = settings.fontColor;
            }
            if (settings.fontSize) {
                console.log(settings.fontSize);
                fontSize.current = settings.fontSize;
            }
        }
    }, [isActive, settings]);
};


export default TextTool;
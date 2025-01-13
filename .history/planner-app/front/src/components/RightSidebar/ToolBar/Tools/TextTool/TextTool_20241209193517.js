import { useContext, useRef, useEffect} from 'react';
import CanvasContext from '../../../../contexts/CanvasContext';
import { useObjects } from '../../../../../hooks/useObjects';
import { drawObjects } from '../../../../../factories/CanvasRender';


const TextTool = ({isActive, settings}) => {
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const {objects, dispatch} = useObjects();
    const textBody = useRef(null);
    const fontSize = useRef(null);
    const textColor = useRef(null);
   
    useEffect(() => {
        if (isActive) {
            if (settings.textBody) {
                console.log(settings.textBody);
                textBody.current = settings.textBody;
            }
            if (settings.textColor) {
                console.log(settings.textColor);
                textColor.current = settings.textColor;
            }
            if (settings.fontSize) {
                console.log(settings.fontSize);
                fontSize.current = settings.fontSize;
            }
        }
    }, [ settings]);

    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current) {
            const mainCtx = getCanvasContext();
            const drawingCtx = getDrawingCanvasContext(); 
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = 'auto';
            drawingCtx.canvas.style.cursor = 'crosshair';
            
            const redrawMainCanvas = () => {
                mainCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, objects);
            };


const handleMouseDown = (event) => {
   console.log('hello')
};
const handleMouseMove = (event) => {
  
};
const handleMouseUp = (event) => {
    const newObject = {
    };
    dispatch({ type: 'ADD_OBJECT', payload: newObject });
    clearDrawingCanvas();
    redrawMainCanvas();
};
            
            drawingCanvas.addEventListener("mousedown", handleMouseDown);
            drawingCanvas.addEventListener("mousemove", handleMouseMove);
            drawingCanvas.addEventListener("mouseup", handleMouseUp);

            return () => {
                if(drawingCanvas){
                drawingCanvas.removeEventListener("mousedown", handleMouseDown);
                drawingCanvas.removeEventListener("mousemove", handleMouseMove);
                drawingCanvas.removeEventListener("mouseup", handleMouseUp);
                }
                drawingCanvas.style.cursor = "default";
                drawingCanvas.style.pointerEvents = "none";
            };
        }
    }, [ isActive, canvasRef, dispatch, objects, 
        drawingCanvasRef, getCanvasContext, 
        getDrawingCanvasContext, clearDrawingCanvas]);

};


export default TextTool;
import { useContext, useRef, useEffect} from 'react';
import CanvasContext from '../../../../contexts/CanvasContext';
import { useObjects } from '../../../../../hooks/useObjects';
import { drawObjects } from '../../../../../factories/CanvasRender';
import { getCoordinates } from '../../../../../utils/commonHelpers';
import { drawingText } from '../../../../../utils/canvasHelpers';


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
    }, [isActive, settings]);

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


const handleClick = (event) => {
    const {x , y} = getCoordinates(event, drawingCanvas);
    drawingText(drawingCtx, textBody.current, x, y, fontSize.current, textColor.current);
   
   
    console.log(textBody.current);
    console.log(drawingCtx);
    const textWidth = drawingCtx.measureText(textBody.current).width;
    console.log(textWidth);

const newObject = { 
        id: Date.now(),
        type: 'text',
        textBody: textBody.current,
        x: x,
        y: y,
        width: textWidth,
        height: fontSize.current, 
        fontSize: fontSize.current,
        textColor: textColor.current,
    };
    dispatch({ type: 'ADD_OBJECT', payload: newObject });
    clearDrawingCanvas();
    redrawMainCanvas();
};
            
            drawingCanvas.addEventListener("click", handleClick);

            return () => {
                if(drawingCanvas){
                drawingCanvas.removeEventListener("click", handleClick);
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
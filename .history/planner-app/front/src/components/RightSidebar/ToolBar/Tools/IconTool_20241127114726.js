import  { useEffect, useContext, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';
import { drawObjects } from '../../../../factories/CanvasRender';
import { drawTemporaryIcon} from '../../../../utils/canvasHelpers';



const IconTool = ({isActive}) =>{ 
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const {objects,  dispatch } = useObjects();
    const isPlacing = useRef(false);
    const startX = useRef(null);
    const startY = useRef(null);
    const shipKey = useRef('destroyer');
    const fillColor = useRef('#fff000');
    const shipLabel = useRef('USS');

    const [currentIcon, setCurrentIcon] = useState(shipKey.current);
    const [currentColor, setCurrentColor] = useState(fillColor.current);

    const icons = {
        battleship: (
            <svg id="uuid-19b12959-7e1d-4b9d-a9c1-62992c23c231" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 346.67 154">
                <polygon fill={fillColor.current} stroke-width="0px" points="0 153.51 41.79 153.94 135.83 .43 .87 0 0 153.51"/>
                <polygon fill={fillColor.current} stroke-width="0px" points="173.48 .36 212.93 .36 118.73 153.94 79.28 153.94 173.48 .36"/>
                <polygon fill={fillColor.current} stroke-width="0px" points="252.3 .3 346.67 77.15 252.88 154 158.51 154 252.3 .3"/>
            </svg>
        ),
        cruiser: (
            <svg id="uuid-e9367c4c-95b3-4e39-b056-31b48712996f" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 346.67 154">
                <polygon fill="#222221" stroke-width="0px" class="uuid-92066642-a0e2-4372-8c77-4df0d47e7d85" points="0 153.51 41.79 153.94 135.83 .43 .87 0 0 153.51"/>
                <polygon fill="#222221" stroke-width="0px" class="uuid-92066642-a0e2-4372-8c77-4df0d47e7d85" points="134.37 .36 173.82 .36 79.62 153.94 40.17 153.94 134.37 .36"/>
                <polygon fill="#222221" stroke-width="0px" class="uuid-92066642-a0e2-4372-8c77-4df0d47e7d85" points="252.3 .3 346.67 77.15 252.88 154 158.51 154 252.3 .3"/>
                <polygon fill="#222221" stroke-width="0px" class="uuid-92066642-a0e2-4372-8c77-4df0d47e7d85" points="213.39 .42 252.84 .42 158.64 153.99 119.19 153.99 213.39 .42"/>
            </svg>
        ),
        destroyer: (
            <svg id="uuid-0a734424-3953-45f4-bd29-22571a09dc3c" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 204.7 132.64">
                <polygon fill={fillColor.current} stroke-width="0px" points="204.7 63.11 0 0 0 132.64 204.7 63.11"/>
            </svg>
        ),
    };

    useEffect((isActive) => {
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
                isPlacing.current = true;
                const {x , y} = getCoordinates(event, drawingCanvas);
                startX.current = x;
                startY.current = y;
            };

            const handleMouseMove = (event) => {
                if (!isPlacing.current) return;
                const { x, y } = getCoordinates(event, drawingCanvas);
                clearDrawingCanvas();
                redrawMainCanvas();
                drawTemporaryIcon(drawingCtx, { x, y, key: shipKey.current, color: fillColor.current, label: shipLabel.current });
            };

            const handleMouseUp = (event) => {
                if (!isPlacing.current) return;
                const { x, y } = getCoordinates(event, drawingCanvas);
                const newObject = {
                    id: Date.now(),
                    type: 'icon',
                    x,
                    y,
                    key: shipKey.current,
                    color: fillColor.current,
                    label: shipLabel.current,
                };
                dispatch({ type: 'ADD_OBJECT', payload: newObject });
                isPlacing.current = false;
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
    },[isActive, canvasRef, dispatch, 
        objects, drawingCanvasRef, getCanvasContext, 
        getDrawingCanvasContext, clearDrawingCanvas,
    ]);
    return ReactDOM.createPortal(, document.getElementById('right-sidebar-settings')
    );
};

export default IconTool;

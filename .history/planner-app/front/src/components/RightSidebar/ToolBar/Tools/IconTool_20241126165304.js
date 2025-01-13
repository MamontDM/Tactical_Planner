import  { useEffect, useContext, useRef, useState } from 'react';
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40" height="40">
                <circle cx="50" cy="50" r="30" fill={fillColor.current} />
            </svg>
        ),
        destroyer: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40" height="40">
                <rect x="20" y="20" width="60" height="60" fill={fillColor.current} />
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
    return (
        <div className="icon-tool">
            <h3>Icon Setting</h3>
            <div className="setting">
                <label>
                    Select Icon:
                    <select 
                        value={currentIcon}
                        onChange={(e) =>{
                            setCurrentIcon(e.target.value);
                            shipKey.current = e.target.value;
                        }}
                        >
                            <option value="destroyer">Destroyer</option>
                            <option value="cruiser">Cruiser</option>
                            <option value="battleship">Battleship</option>
                        </select>
                </label>
                <label>
                    Select Color:
                    <input
                        type="color"
                        value={currentColor}
                        onChange={(e) => {
                            setCurrentIcon(e.taget.value);
                            fillColor.current = e.target.value;
                        }}
                    />
                </label>
                <label>
                    Label:
                    <input
                        type="text"
                        defaultValue={shipLabel.current}
                        onChange={(e) => {
                            shipLabel.current = e.target.value; // Обновляем метку
                        }}
                    />
                </label>
            </div>
        </div>
    )
};

export default IconTool;

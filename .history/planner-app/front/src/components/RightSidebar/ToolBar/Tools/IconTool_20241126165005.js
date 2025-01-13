import  { useEffect, useContext, useRef } from 'react';
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

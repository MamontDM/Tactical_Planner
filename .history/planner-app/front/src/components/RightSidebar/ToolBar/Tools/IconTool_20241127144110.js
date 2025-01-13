import  { useEffect, useContext, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';
import { drawObjects } from '../../../../factories/CanvasRender';
import { drawTemporaryIcon} from '../../../../utils/canvasHelpers';
import { getSvgTemplate, convertSvgToImage } from '../../../../factories/IconSVGCreator';
import { IconDestroyer, IconCruiser, IconBattleship } from '../../../../assets/exportIcon';



const IconTool = ({isActive}) =>{ 
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const {objects,  dispatch } = useObjects();
    const rightSidebar = document.getElementById('rightSidebar');
    const isPlacing = useRef(false);
    const startX = useRef(null);
    const startY = useRef(null);
    const shipImg = useRef(null);
    const fillColor = useRef('#fff000');
    const shipLabel = useRef('USS');

    const handleSetShipIcon = (shipType) => {
        shipKey.current = shipType; // Обновляем текущий тип
        console.log(`Selected Ship: ${shipType}`);
      };
    
      const handleSetColor = (color) => {
        fillColor.current = color; // Обновляем цвет
        console.log(`Selected Color: ${color}`);
      };
    
      const handleSetLabel = (label) => {
        shipLabel.current = label; // Обновляем лейбл
        console.log(`Selected Label: ${label}`);
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



    if (!isActive || !rightSidebar) {
        return null;
      }
        return ReactDOM.createPortal(
            <div className="tool-settings">
                <label>
                    <h3>Select ship type:</h3>
                </label>
                <ul className="ship-icon-list">
                    <button className="ship-button" onClick={() => handleSetShipIcon('destroyer')}
                        >
                   <img className="ship-icon" 
                        src={IconDestroyer} 
                        alt="error" />
                    </button>
                    <button 
                        className="ship-button"
                        onClick={() => handleSetShipIcon('cruiser')}
                        >
                          <img className="ship-icon" 
                        src={IconCruiser} 
                        alt="error" />
                    </button>
                    <button 
                        className="ship-button"
                        onClick={() => handleSetShipIcon('battleship')}
                        >
                          <img className="ship-icon" 
                        src={IconBattleship} 
                        alt="error" />
                    </button>
                </ul>
            </div>, 
            rightSidebar
    );
};

export default IconTool;

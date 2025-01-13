import React, {  useState, useEffect, useRef, useContext  } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';

const LineTool = ({isActive}) => {

    const [lineWidth, setLineWidth] = useState(2);
    const [strokeStyle, setStrokeStyle] = useState('#ffffff');
    const [isDrawing, setIsDrawing] = useState(false);
    const [points, setPoints] = useState([]);

    const canvasRef  = useContext(CanvasContext);
    const contextRef = useRef(null);


    useEffect(() => {
        if (isActive) {
            activate();
        } else {
            deactivate();
        }
        return () => deactivate();
    }, [isActive]);

    const activate = () => {
        if (canvasRef.current) {
            contextRef.current = canvasRef.current.getContext('2d');
            contextRef.current.canvas.style.cursor = 'crosshair';
    
            contextRef.current.canvas.onmousedown = onMouseDown;
            contextRef.current.canvas.onmousemove = onMouseMove;
            contextRef.current.canvas.onmouseup = onMouseUp;
        } else {
            console.warn("canvasRef.current is undefined");
        }
    };
    const deactivate = () => {
        if (contextRef.current) {
            contextRef.current.canvas.onmousedown = null;
            contextRef.current.canvas.onmousemove = null;
            contextRef.current.canvas.onmouseup = null;
            contextRef.current.canvas.style.cursor = 'default';
        }
        setIsDrawing(false);
        setPoints([]);
        };
   

    const onMouseDown = (event) => {
                const { x, y } = getCoordinates(event, canvasRef.current);
                setPoints([{ x, y }]);
                setIsDrawing(true);
        
                contextRef.current.beginPath();
                contextRef.current.lineWidth = lineWidth;
                contextRef.current.strokeStyle = strokeStyle;
                contextRef.current.moveTo(x, y);
            };
        
            const onMouseMove = (event) => {
                if (!isDrawing) return;
        
                const { x, y } = getCoordinates(event, canvasRef.current);
                setPoints(prevPoints => [...prevPoints, { x, y }]);
        
                contextRef.current.lineTo(x, y);
                contextRef.current.stroke();
            };
        
            const onMouseUp = () => {
                if (!isDrawing) return;
        
                setIsDrawing(false);
                contextRef.current.closePath();
        
                const object = {
                    points: points,
                    type: 'line',
                    options: {
                        lineWidth: lineWidth,
                        strokeStyle: strokeStyle
                    }
                };
                console.log(object);
                setPoints([]);
            };

};
export default LineTool;


// import React, { useState, useEffect, useRef } from 'react';

// const LineTool = ({ isActive, facade }) => {
//     // Храним состояние для текущей ширины линии, цвета и других параметров
//     const [lineWidth, setLineWidth] = useState(2);
//     const [strokeStyle, setStrokeStyle] = useState('#ffffff');
//     const [isDrawing, setIsDrawing] = useState(false);
//     const [points, setPoints] = useState([]);

//     const canvasRef = useRef(null); // Используем для ссылки на canvas
//     const contextRef = useRef(null);

//     // Инициализация необходимых зависимостей из facade
//     const context = facade.getContext();
//     const drawingModel = facade.getDrawingModel();
//     const objectFactory = facade.getObjectFactory();
//     const commonHelpers = facade.getCommonHelpers();

//     useEffect(() => {
//         if (isActive) {
//             activate();
//         } else {
//             deactivate();
//         }
//     }, [isActive]);

//     const activate = () => {
//         // Устанавливаем контекст для рисования
//         contextRef.current = context.getContext('2d');
//         contextRef.current.canvas.style.cursor = 'crosshair';

//         // Назначаем события для рисования
//         contextRef.current.canvas.onmousedown = onMouseDown;
//         contextRef.current.canvas.onmousemove = onMouseMove;
//         contextRef.current.canvas.onmouseup = onMouseUp;

//         document.addEventListener('click', handleIconClick);
//     };

//     const deactivate = () => {
//         if (contextRef.current) {
//             contextRef.current.canvas.onmousedown = null;
//             contextRef.current.canvas.onmousemove = null;
//             contextRef.current.canvas.onmouseup = null;
//             contextRef.current.canvas.style.cursor = 'default';
//         }
//         setIsDrawing(false);
//         setPoints([]);
//         document.removeEventListener('click', handleIconClick);
//     };

//     const handleIconClick = (event) => {
//         const styleElement = event.target.closest('.property-button');
//         if (styleElement) {
//             setToolStyle(styleElement.id);
//         }
//     };

//     const setToolStyle = (key) => {
//         const styles = {
//             'alies': { lineWidth: 3, strokeStyle: '#1eff00' },
//             'enemies': { lineWidth: 3, strokeStyle: '#ff1900' },
//             'neutral': { lineWidth: 3, strokeStyle: '#31a6f5' }
//         };
//         if (styles[key]) {
//             setLineWidth(styles[key].lineWidth);
//             setStrokeStyle(styles[key].strokeStyle);
//         }
//     };

//   

//     return (
//         <canvas ref={canvasRef} width={800} height={600} />
//     );
// };

// export default LineTool;

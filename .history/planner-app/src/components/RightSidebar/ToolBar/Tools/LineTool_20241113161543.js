import React, {  useState, useEffect, useRef  } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';

const LineTool = ({isActive}) => {

    const [lineWidth, setLineWidth] = useState(2);
    const [strokeStyle, setStrokeStyle] = useState('#ffffff');
    const [isDrawing, setIsDrawing] = useState(false);
    const [points, setPoints] = useState([]);

    const canvasRef = useRef(null); 
    const contextRef = useRef(null);


    useEffect(() => {
        if (isActive) {
            activate();
        }
    }, [isActive]);

    const activate = () => {
        contextRef.current = contextRef.getContext('2d');
        contextRef.current.canvas.style.cursor = 'crosshair';
        contextRef.current.canvas.onmousedown = onMouseDown;
        contextRef.current.canvas.onmousemove = onMouseMove;
        contextRef.current.canvas.onmouseup = onMouseUp;

        document.addEventListener('click', handleIconClick);
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
        document.removeEventListener('click', event);
    };

    const onMouseDown = (event) => {
                const { x, y } = getCoordinates(event);
                setPoints([{ x, y }]);
                setIsDrawing(true);
        
                contextRef.current.beginPath();
                contextRef.current.lineWidth = lineWidth;
                contextRef.current.strokeStyle = strokeStyle;
                contextRef.current.moveTo(x, y);
            };
        
            const onMouseMove = (event) => {
                if (!isDrawing) return;
        
                const { x, y } = getCoordinates(event);
                setPoints(prevPoints => [...prevPoints, { x, y }]);
        
                contextRef.current.lineTo(x, y);
                contextRef.current.stroke();
            };
        
            const onMouseUp = () => {
                if (!isDrawing) return;
        
                setIsDrawing(false);
                contextRef.current.closePath();
        
                const object = createObject(points, 'line', {
                    lineWidth: lineWidth,
                    strokeStyle: strokeStyle
                });
                console.log(object);
                setPoints([]);
            };










}
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

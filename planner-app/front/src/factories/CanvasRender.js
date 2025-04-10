import  {useContext, useEffect} from 'react';
import CanvasContext from '../components/contexts/CanvasContext';
import { curveEndDrawArrow , drawSmoothCurve, drawArea, drawTemporaryIcon, drawingText, getContrastTextColor  } from '../utils/canvasHelpers';
import { useMapStore } from "../store/zustand/MapStore/mapStore"
import { object } from 'prop-types';

export const drawObject = (canvas, object) => {
    if(!canvas || !object){
        console.error('Canvas or object is missing');
        return;
    }
    const context = canvas.getContext('2d');
    if(!context){
        console.error('Failed to get canvas');
        return;
    }
    switch (object.type){
        case 'line': 
            context.beginPath();
            context.lineWidth = object.lineWidth;
            context.strokeStyle = object.color;
            object.points.forEach((point, index) => {
                if (index === 0){
                    context.moveTo(point.x, point.y);
                }else{
                    context.lineTo(point.x, point.y);
                }
            });
            context.stroke();
            context.closePath();
            break;
        case 'tech':
            if (object.points.length < 2) break;

        const [start, end] = object.points;
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;

       
        context.beginPath();
        context.lineWidth = object.lineWidth;
        context.strokeStyle = object.color;
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.stroke();
        context.closePath();

        if (object.distanceKm) {
            const textOffsetY = -10;
            
            context.font = "14px Arial";
            context.fillStyle = object.color;
            context.textAlign = "center";
            context.textBaseline = "bottom";
            context.fillText(`${object.distanceKm} км`, midX, midY + textOffsetY);
        }
        break;

        break;
        case 'curve': 
            context.lineWidth = object.lineWidth;
            context.strokeStyle = object.color;
            const points = object.points;
            const temporaryPoints = object.temporaryPoints;
            drawSmoothCurve(temporaryPoints, points, context.lineWidth, context.strokeStyle, context,
            );
            if (object.arrow) {
                curveEndDrawArrow(
                    context,
                    object.arrow.fromX,
                    object.arrow.fromY,
                    object.arrow.toX,
                    object.arrow.toY,
                    object.arrow.angle,
                    object.arrow.headLength,
                    object.color,
                    object.linewidth,
                );
            }
            break;
        case 'radar':
        case 'base':
            const textColor = getContrastTextColor(object.color);
            const lineWidth = object.lineWidth;    
            const strokeStyle = object.type === 'base' ? textColor : object.color;    
            const {x , y} = object.points[0];
            const radius = object.radius;
            context.lineWidth = lineWidth;
            context.strokeStyle = strokeStyle;
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI);
            context.stroke();

            if(object.type === 'base') { 
                context.fillStyle = object.color;
                context.fill();
                drawingText(context, object.textBody, x, y, object.fontSize, textColor);
                context.save();
                context.beginPath();
                context.arc(x, y, 15, 0, Math.PI * 2);
                context.arc(x, y, 18, 0, Math.PI * 2);
                context.strokeStyle = textColor;
                context.lineWidth = 0.5;
                context.stroke();
                context.restore();
            }
            break;


        case 'vision':
            drawArea( context ,
                object.x, 
                object.y, 
                object.radius, 
                object.startAngle, 
                object.endAngle, 
                object.rotationAngle, 
                object.strokeStyle, 
                object.fillStyle
            );    
        break;
        case 'icon':
            drawTemporaryIcon(
                context,
                object.x, 
                object.y, 
                object.img, 
                object.rotation, 
                object.color, 
                object.label, 
            ); 
        break;
        case 'text':
            drawingText(
                context,
                object.textBody,
                object.x,
                object.y,
                object.fontSize,
                object.textColor,
            );
            break;
        default:
            console.log('default case');
            break;

    }
};

export const drawStaticObjects = (canvas, objects) => {
    if(!objects){
       
        return;
    }
    if (!canvas || !objects) return;

    const context = canvas.getContext('2d');
    const { width, height } = canvas;

    context.clearRect(0, 0, width, height);

    objects.forEach(obj => {
        let x;
        let y;
        const scale = width / 1200;

        switch (obj.type) {
            case 'base':
                x = obj.points[0].x / 1200 * width;
                y = obj.points[0].y / 1200 * height;

                const textColor = "#fff";
                const lineWidth = obj.lineWidth;    
                const strokeStyle = textColor;    
                console.log(scale);
                const radius = obj.radius * scale;
                console.log(radius);
                context.lineWidth = lineWidth;
                context.strokeStyle = strokeStyle;
                context.beginPath();
                context.arc(x, y, radius, 0, 2 * Math.PI);
                context.stroke();

                context.fillStyle = obj.color;
                context.fill();
                drawingText(context, obj.textBody, x, y, obj.fontSize, textColor);
                context.save();
                context.beginPath();
                context.arc(x, y, 15, 0, Math.PI * 2);
                context.arc(x, y, 18, 0, Math.PI * 2);
                context.strokeStyle = textColor;
                context.lineWidth = 0.5;
                context.stroke();
                context.restore();
            break;
            case 'text':
                x = obj.x / 1200 * width;
                y = obj.y / 1200 * height;
                const fontSize = obj.fontSize * scale;
            drawingText(
                context,
                obj.textBody,
                x,
                y,
                fontSize,
                obj.textColor,
            );
            break;
        default:
            console.log('default case');
            break;
        }
    });
};

export const drawObjects = (canvas, objects) =>{
    if(!objects){
        return;
    }
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    objects.forEach((object) => drawObject(canvas, object));
};


const CanvasRenderer = () =>  {
    const { canvasRef } = useContext(CanvasContext);
    const objects = useMapStore((state) => state.maps[state.selectedMapId]?.objects);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
       
        drawObjects(canvas, objects);
    }, [canvasRef, objects]);
    
    return null;
};

export default CanvasRenderer;
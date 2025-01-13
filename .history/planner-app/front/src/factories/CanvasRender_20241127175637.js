import  {useContext, useEffect} from 'react';
import CanvasContext from '../components/contexts/CanvasContext';
import { curveEndDrawArrow , drawSmoothCurve, drawArea, drawTemporaryIcon  } from '../utils/canvasHelpers';
import { useObjects } from '../hooks/useObjects';


export const drawObject = (canvas, object) => {
    console.log(object);
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
        case 'tech':
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
            const lineWidth = object.lineWidth;    
            const strokeStyle = object.color;    
            const {x , y} = object.points[0];
            const radius = object.radius;

            context.lineWidth = lineWidth;
            context.strokeStyle = strokeStyle;
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI);
            context.stroke();
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
                object.angle, 
                object.color, 
                object.label, 
            ); 
        break;
        default:
            console.log('default case');
            break;

    }
};

export const drawObjects = (canvas, objects) =>{
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log(objects);
    objects.forEach((object) => drawObject(canvas, object));
};


const CanvasRenderer = () =>  {
    const { canvasRef } = useContext(CanvasContext);
    const { objects } = useObjects();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
       
        drawObjects(canvas, objects);
    }, [canvasRef, objects]);
    
    return null;
};

export default CanvasRenderer;
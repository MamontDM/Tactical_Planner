import  {useContext, useEffect} from 'react';
import CanvasContext from '../components/contexts/CanvasContext';
import { curveEndDrawArrow , drawSmoothCurve, drawArea, drawTemporaryIcon, drawingText, getContrastTextColor  } from '../utils/canvasHelpers';
import { useObjects } from '../hooks/useObjects';


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
                const textWidth = drawingText(context, object.textBody, x, y, object.fontSize, textColor);
                const textHight = object.fontSize;

                const diamondFigurePoints = [
                    {x: x, y: y - textHight},
                    {x: x + textWidth, y: y},
                    {x: x, y: y + textHight / 0.9},
                    {x: x - textWidth, y: y}
                ];

                context.save();
                context.strokeStyle = textColor;
                context.lineWidth = 2;
                context.beginPath();
                context.moveTo(diamondFigurePoints[0].x, diamondFigurePoints[0].y);
                diamondFigurePoints.forEach((point, index) => {
                    if(index !== 0) context.lineTo(point.x, point.y);
                });
                context.closePath();
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

export const drawObjects = (canvas, objects) =>{
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
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
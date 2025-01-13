import React, {useRef, useContext, useEffect} from 'react';
import { ObjectContext } from '../components/contexts/ObjectContext';

const CanvasRenderer = () =>  {
    const canvasRef = useRef(null);
    const { objects } = useContext(ObjectContext);

    useEffect(() => {
        console.log('componen called')
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0,0, canvas.width, canvas.height);

        const drawObject = (object) => {
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
            }
        };

        objects.forEach((object) => drawObject(object));
    }, [objects]);

};

export default CanvasRenderer;
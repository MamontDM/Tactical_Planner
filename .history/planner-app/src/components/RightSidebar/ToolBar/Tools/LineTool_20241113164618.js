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
        if (isActive  && canvasRef.current) {
            console.log('active');
        } else if (!isActive){
            console.log('deactivate')
        }
       
    }, [isActive]);

};
export default LineTool;
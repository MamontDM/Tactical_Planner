import React, {  useState, useEffect, useRef, useContext  } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';

const LineTool = ({isActive}) => {

    const canvasRef  = useContext(CanvasContext);
    const contextRef = useRef(null)

    useEffect(() => {
        if (isActive ) {
            console.log('active');
        } else {
            console.log('deactivate')
        }
    }, [isActive]);


    const activate = () =>{
        canvasRef.context = canvasRef.current.getCanvasContext();
    }







    const onMouseDown = () =>{
        console.log()
    }




    return null;
};
export default LineTool;
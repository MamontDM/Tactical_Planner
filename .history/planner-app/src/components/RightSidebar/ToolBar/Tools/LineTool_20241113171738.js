import React, {  useState, useEffect, useRef, useContext  } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';

const LineTool = ({isActive}) => {

    const canvasRef  = useContext(CanvasContext);
    const contextRef = useRef(null);

    useEffect(() => {
        if (isActive && canvasRef.current) {
            contextRef.current = canvasRef.current.getContext('2d');
            console.log('Line tool activated');
        }
        return () => {
            if (contextRef.current) {
                console.log('Line tool deactivated');
                contextRef.current = null;
            }
        };
    }, [isActive, canvasRef]);


    const activate = () =>{
        canvasRef.context = canvasRef.current.getCanvasContext();
    }







    const onMouseDown = () =>{
        console.log()
    }




    return null;
};
export default LineTool;
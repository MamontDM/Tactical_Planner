import React, {  useState, useEffect, useRef, useContext  } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';

const LineTool = ({isActive}) => {

    const canvasRef  = useContext(CanvasContext);

    useEffect(() => {
        if (isActive ) {
            console.log('active');
        } else {
            console.log('deactivate')
        }
    }, [isActive]);
    return null;
};
export default LineTool;
import React, { useEffect, useContext } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { findClickedObject } from '../../../../utils/commonHelpers';
import CanvasRenderer from '../../../../factories/CanvasRender';
import { useObjects } from '../../../../hooks/useObjects';
import { clearCanvas } from '../../../../factories/CanvasRender';
import { drawObjects } from '../../../../factories/CanvasRender';

const MoveTool = ({isActive}) => {
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const {objects,  dispatch } = useObjects();
    const contextRef = useRef(null);
    const isDrawing = useRef(false);
    const pointRef = useRef([]);
    const lineWidth = 2;
    const strokeStyle = "#fff234";

    useEffect(() => {

        if (isActive && canvasRef?.current && drawingCanvasRef?.current) {

    });
}


export default MoveTool;
import { useContext, useEffect } from 'react';
import { useObject } from '../../../../hooks/useObjects';
import CanvasContext from '../../../contexts/CanvasContext';
 

const ClearTool = ({ onDeactivate, isActive})=> {
    const { dispatch } = useObject();
    const { clearMaincanvas } = useContext(CanvasContext);


    useEffect (() =>  {
        if(isActive) {
            dispatch({type: "CLEAR_OBJECTS"});
            clearMaincanvas();
            onDeactivate();
        }
    }, [isActive, dispatch, onDeactivate]);


    return null;
};

export default ClearTool;
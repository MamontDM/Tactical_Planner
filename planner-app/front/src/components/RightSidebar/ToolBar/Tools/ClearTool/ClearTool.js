import { useContext, useEffect, useRef } from 'react';
import { useObjects } from '../../../../../hooks/useObjects';
import CanvasContext from '../../../../contexts/CanvasContext';
 

const ClearTool = ({isActive, onDeactivate})=> {
   
    console.log('called Clear tool!')
    const { dispatch } = useObjects();
    const isCompleted = useRef(false);
    const { clearMainCanvas } = useContext(CanvasContext);

        useEffect (() =>  {
            if(isActive && !isCompleted.current) {
                dispatch({type: "CLEAR_OBJECTS"});
                clearMainCanvas();
                isCompleted.current = true;
                onDeactivate();
            }
        }, [isActive]);

    return null;
};

export default ClearTool;
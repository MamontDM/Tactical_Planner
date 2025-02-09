import { useEffect, useRef } from 'react';
import { useObjects } from '../../../../../hooks/useObjects';

const UndoTool = ({isActive, onDeactivate}) => {

    const { dispatch } = useObjects();
    const isCompleted = useRef(false)
       
    useEffect (() =>  {
            if(isActive && !isCompleted.current) {

                dispatch({type: "UNDO"});
                isCompleted.current = true;
                onDeactivate();
            }
        }, [isActive]);
       
    return null;
};

export default UndoTool;
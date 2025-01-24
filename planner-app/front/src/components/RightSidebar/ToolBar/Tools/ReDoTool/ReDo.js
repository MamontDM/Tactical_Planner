import { useEffect, useRef } from 'react';
import { useObjects } from '../../../../../hooks/useObjects';

const ReDoTool = ({ isActive,  onDeactivate }) => {
    const { dispatch } = useObjects(); 
    const isCompleted = useRef(false)

    useEffect (() =>  {
        if(isActive && !isCompleted.current) {
            isCompleted.current = true;
            dispatch({type: "REDO"});
            onDeactivate();
        }
    }, [isActive]);
    return null;
};

export default ReDoTool;
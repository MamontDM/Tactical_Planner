import React from 'react';
import { useObjects } from '../../../../hooks/useObjects';

const UndoTool = ({ isActive, onDeactivate }) => {
    const { dispatch } = useObjects(); 
   
    useEffect (() =>  {
        if(isActive) {
            dispatch({type: "UNDO"});
            onDeactivate();
        }
    }, [isActive, dispatch, onDeactivate]);
    return null;
};

export default UndoTool;
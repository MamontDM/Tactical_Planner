import { useEffect } from 'react';
import useEffect from '../../../../hooks/useObjects';

const UndoTool = ({isActive}) => {
    const { dispatch } = useObjects(); 
   
    useEffect (() =>  {
        if(isActive) {
            dispatch({type: "UNDO"});
            onDeactivate();
        }
    }, [isActive, dispatch, onDeactivate]);
    return null;
};

export default {UndoTool};
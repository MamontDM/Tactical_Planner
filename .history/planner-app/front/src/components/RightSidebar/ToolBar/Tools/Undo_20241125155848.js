import { useEffect } from 'react';
import useEffect from '../../../../hooks/useObjects';

const UndoTool = ({isActive}) => {
    const { objects, dispatch } = useObjects(); 
   
    useEffect (() =>  {
        dispatch({type: "UNDO", payload: clickedObject.id});
    }, [isActive]);
}

export default {UndoTool};
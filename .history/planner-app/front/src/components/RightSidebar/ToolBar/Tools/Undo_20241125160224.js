import { useEffect } from 'react';
import useEffect from '../../../../hooks/useObjects';

const UndoTool = ({isActive}) => {
    const { dispatch } = useObjects(); 
   
    useEffect (() =>  {
        dispatch({type: "UNDO"});
    }, [isActive]);
}

export default {UndoTool};
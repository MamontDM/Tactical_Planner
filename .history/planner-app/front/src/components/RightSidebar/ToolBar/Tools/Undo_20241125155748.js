import { useEffect } from 'react';
import useEffect from '../../../../hooks/useObjects';

const UndoTool = ({isActive}) => {
    const { objects, dispatch } = useObjects(); 
   
    useEffect (() =>  {

    }, [isActive]);
}

export default {UndoTool};
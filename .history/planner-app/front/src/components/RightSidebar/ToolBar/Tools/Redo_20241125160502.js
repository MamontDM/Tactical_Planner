import { useEffect } from 'react';
import useEffect from '../../../../hooks/useObjects';

const ReDoTool = ({isActive}) => {
    const { dispatch } = useObjects(); 
   
    useEffect (() =>  {
        if(isActive) {
            dispatch({type: "UNDO"});
            onDeactivate();
        }
    }, [isActive, dispatch, onDeactivate]);
    return null;
};

export default ReDoTool;
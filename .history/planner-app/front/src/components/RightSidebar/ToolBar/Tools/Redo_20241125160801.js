import { useEffect } from 'react';
import useObjects from '../../../../hooks/useObjects';

const ReDoTool = ({isActive}) => {
    const { dispatch } = useObjects(); 
   
    useEffect (() =>  {
        if(isActive) {
            dispatch({type: "REDO"});
            onDeactivate();
        }
    }, [isActive, dispatch, onDeactivate]);
    return null;
};

export default ReDoTool;
import React, {useEffect,useRef, useContext} from 'react'
import { useObjects } from '../../../../../hooks/useObjects';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : import.meta.env.VITE_API_BASE_URL;

const SaveTool = ({isActive, onDeactivate}) => {
    const { dispatch, snapshot } = useObjects();
    const isCompleted = useRef(false);
    const hasSaved = useRef(false);

    useEffect (() =>  {
        if(isActive && !isCompleted.current) {
                dispatch({type: "SAVE_SNAPSHOT"});
                isCompleted.current = true;
        }
    }, [isActive]);

    const saveSnapsShotToBD = async (snapshot) => {
            fetch(`${API_BASE_URL}/api/mapstorage/user-data/savemap`, {
                method: 'POST',
                credentials: 'include',
                headers: {"Content-Type" : 'application/json'},
                body: JSON.stringify({ snapshot })
        }).
        catch(error => console.error("Something go wrong:" , error.message));            
    };


    useEffect(() => {
        if(snapshot && !hasSaved.current){
            hasSaved.current = true;
            saveSnapsShotToBD(snapshot).then(() => {
                    onDeactivate();
                });
        }
    }, [snapshot])

    return null;
};

export default SaveTool;


import React, {useEffect} from 'react'
// import { useObjects } from '../../../../../hooks/useObjects';

// const API_BASE_URL =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:5000'
//     : import.meta.env.VITE_API_BASE_URL;

const SaveTool = ({isActive, onDeactivate}) => {
    // const saveSnapsShotToBD = async (snapshot) => {
    //         fetch(`${API_BASE_URL}/api/mapstorage/user-data/savemap`, {
    //             method: 'POST',
    //             credentials: 'include',
    //             headers: {"Content-Type" : 'application/json'},
    //             body: JSON.stringify({ snapshot })
    //     }).
    //     catch(error => console.error("Something go wrong:" , error.message));            
    // };

    useEffect(() => {
       alert("sorry temporary unavaliable... working on it.  Use 'Load' Tool");
        onDeactivate();
    }, [isActive])

    return null;
};

export default SaveTool;


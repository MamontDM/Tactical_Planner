import React, { useEffect, useContext } from 'react';
// import { getCoordinates } from '../../../../utils/commonHelpers';
// import CanvasContext from '../../../contexts/CanvasContext';
// import { useObjects } from '../../../../hooks/useObjects';
// import { findClickedObject } from '../../../../utils/commonHelpers';
// import CanvasRenderer from '../../../../factories/CanvasRender';

const CurveTool = ({isActive}) => {
 
    useEffect(() => {
    if(isActive){
        console.log('called instrument')
    }else{
        console.log('don`t called');
    }
    }, []);
};



export default CurveTool;
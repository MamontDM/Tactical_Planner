    import React, {useEffect, useContext} from 'react';
    import CanvasContext from '../../../contexts/CanvasContext';
    import { useObjects} from '../../../../hooks/useObjects';





const StraightTool = ({isActive}) => {
    const { canvasRef} = useContext(CanvasContext);
    const { objects, dispatch} = useObjects();
}


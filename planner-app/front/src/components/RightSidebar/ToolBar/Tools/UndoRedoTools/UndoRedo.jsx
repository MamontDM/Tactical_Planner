import React from 'react';
import UndoTool from './UnDoTool/UnDo.jsx';
import ReDoTool from './ReDoTool/ReDo.jsx';
import ToolbarButton from '../../../../shared/ToolbarButton.jsx';
import LeftArrow from "../../../../../assets/Icon/IconLeft.png";
import RightArrow from "../../../../../assets/Icon/IconRight.png";
import { useMapStore } from "../../../../../store/zustand/MapStore/mapStore.js"

const UndoRedoControls = () => {
    const undo = useMapStore.getState().undo;
    const redo = useMapStore.getState().redo;

    return (
        <>
            <ToolbarButton
                id="undo"
                className="toolbar-button-undo"
                icon={LeftArrow}
                label="Undo"
                onClick={() => undo()}
            />
            <ToolbarButton
                id="redo"
                className="toolbar-button-redo"
                icon={RightArrow}
                label="Redo"
                onClick={() => redo()}
            />
        </>
    );
};

export default UndoRedoControls;

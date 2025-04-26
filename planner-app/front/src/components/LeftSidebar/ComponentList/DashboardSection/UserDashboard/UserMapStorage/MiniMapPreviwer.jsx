import { useMapActionManager } from "../../../../../../hooks/useMapActionManager";
import styles from "./userMap.module.css";

const MiniMapPreviewer = ({mapData, handleSelectMap, handleRemoveMap}) => {
  
    return (
        <div className={styles["map-item"]}>
            <button onClick={() => handleRemoveMap(mapData._id)} className={styles.deleteButton}>
                ❌
            </button>
            <button
                onClick={() => handleSelectMap(mapData)}
            >
                <img className={styles["map-preview"]} src={mapData.miniImg} alt="mapImage Error" />
                <span>{mapData.name}</span>
            </button>
            
        </div>
    );
};

export default MiniMapPreviewer;
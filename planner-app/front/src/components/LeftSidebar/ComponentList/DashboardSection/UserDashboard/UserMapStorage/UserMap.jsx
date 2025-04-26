import styles from "./userMap.module.css";
import MiniMapPreviewer from './MiniMapPreviwer';
import { useMapStoreListDb } from "@/store/zustand/MapStore/mapStoreDbList";
import { useMapActionManager } from "../../../../../../hooks/useMapActionManager";



const UsersMap = () => {
    const maps = useMapStoreListDb(state => state.mapStoreList);
    const {handleSelectMap, handleRemoveMap }  = useMapActionManager();
    if (!maps?.length) return <p>Карт пока нет.</p>;

    
    return (
        <div className={styles["main-container"]}>
                <label>
                    <h2>Map Storage</h2>
                </label>
                    <div className={styles["map-slider"]}>
                        {maps.map((map) => (
                            <MiniMapPreviewer 
                            key={map._id} 
                            mapData={map}
                            handleSelectMap={handleSelectMap}
                            handleRemoveMap={handleRemoveMap}
                            />
                        ))}
                    </div>
            </div>
    );
};

export default UsersMap;
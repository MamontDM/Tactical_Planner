import { useEffect, useState, useContext, useCallback } from "react";
import AuthContext from "../components/contexts/AuthContext";
import { useMapStoreListDb } from "@/store/zustand/MapStore/mapStoreDbList";

    const API_BASE_URL =
        process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : import.meta.env.VITE_API_BASE_URL;
    
     export const useMapSyncManager = () => {
        const { isAuthenticated } = useContext(AuthContext);
        const addMapToList = useMapStoreListDb.getState().addToMapList;

        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);
        const [lastSyncTime, setLastSyncTime] = useState(null);
     


        const syncMapsFromDb = useCallback(async () => {
            try {
              setIsLoading(true);
              setError(null);
              const response = await fetch(`${API_BASE_URL}/api/mapstorage/getmap`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
              });
              if (!response.ok) throw new Error("Server error");
              const data = await response.json();
              addMapToList(data);
              setLastSyncTime(new Date());
            } catch (error) {
              setError(error.message || "Unknown error");
            } finally {
              setIsLoading(false);
            }
          }, [addMapToList]);

    useEffect(() => {
        if (isAuthenticated) {
            syncMapsFromDb();
        }
      }, [isAuthenticated, syncMapsFromDb]);

      
      return {
        syncMapsFromDb,
        isLoading,
        error,
        lastSyncTime,
      };

};
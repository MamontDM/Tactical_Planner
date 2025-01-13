import { useContext } from "react";
import { ShipContext } from "./ShipProvider";

export const useShipContext = () => {
    const context = useContext(ShipContext);
    if (!context) {
        throw new Error("useShipContext must be used within a ShipProvider");
    }
    return context;
};

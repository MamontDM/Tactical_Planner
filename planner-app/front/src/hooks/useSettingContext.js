import { useContext } from "react";
import  SettingContext  from "../components/contexts/ToolSettingProvider";

export function useSettingContext() {
    const context = useContext(SettingContext);
    if (!context) {
        throw new Error("custom hooks for  commonSettings");
    }
    return context;
};

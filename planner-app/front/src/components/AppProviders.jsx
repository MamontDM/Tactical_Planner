import { CanvasProvider } from './contexts/CanvasContext';
import { MapContextProvider } from './contexts/MapSelectorContext';
import { ShipProvider } from './contexts/ShipContext';
import { SettingProvider } from './contexts/ToolSettingProvider';
import  { AuthProvider } from './contexts/AuthContext';

const AppProviders = ({ children }) => {
    return (
    <AuthProvider >
        <CanvasProvider>
            <MapContextProvider>
                <ShipProvider>
                    {children}
                </ShipProvider>
            </MapContextProvider>
        </CanvasProvider>
    </AuthProvider>
    );
};

export default AppProviders;
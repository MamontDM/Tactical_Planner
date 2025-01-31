import { CanvasProvider } from './contexts/CanvasContext';
import { MapContextProvider } from './contexts/MapSelectorContext';
import { ShipProvider } from '../components/contexts/ShipContext';
import { SettingProvider } from './contexts/ToolSettingProvider';
import  { AuthProvider } from './contexts/AuthContext';

const AppProviders = ({ children }) => {
    return (
    <AuthProvider >
        <CanvasProvider>
            <MapContextProvider>
                <ShipProvider>
                    <SettingProvider>{children}</SettingProvider>
                </ShipProvider>
            </MapContextProvider>
        </CanvasProvider>
    </AuthProvider>
    );
};

export default AppProviders;
import { CanvasProvider } from './contexts/CanvasContext';
import { MapContextProvider } from './contexts/MapSelectorContext';
import { ShipProvider } from '../components/contexts/ShipContext';
import { SettingProvider } from './contexts/ToolSettingProvider';

const AppProviders = ({ children }) => {
    return (
        <CanvasProvider>
            <MapContextProvider>
                <ShipProvider>
                    <SettingProvider>{children}</SettingProvider>
                </ShipProvider>
            </MapContextProvider>
        </CanvasProvider>
    );
};

export default AppProviders;
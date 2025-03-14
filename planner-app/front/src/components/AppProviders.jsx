import { CanvasProvider } from './contexts/CanvasContext';
import { ShipProvider } from './contexts/ShipContext';
import  { AuthProvider } from './contexts/AuthContext';

const AppProviders = ({ children }) => {
    return (
    <AuthProvider >
        <CanvasProvider>
                <ShipProvider>
                    {children}
                </ShipProvider>
        </CanvasProvider>
    </AuthProvider>
    );
};

export default AppProviders;
import '../styles/App.css';
import LeftSidebar from './LeftSidebar/leftSidebar';
import RightSidebar from './RightSidebar/RightSidebar';
import Header from './Header';
import Footer from './Footer';
import CanvasElements  from './MainContent/CanvasElements';
import { CanvasProvider } from './contexts/CanvasContext';
import { MapContextProvider } from './contexts/MapSelectorContext';
import { ShipProvider } from '../components/contexts/ShipContext';
import CanvasRenderer from '../factories/CanvasRender';
import AppContext from './contexts/appContext';

const App = () => {
  return (
    <AppContext>
    <CanvasProvider>
      <MapContextProvider>
          <ShipProvider>
            <div className="app-wrapper">
              <Header />
                <div className="main-content">
                  <LeftSidebar />
                    <CanvasElements />
                    <CanvasRenderer />
                  <RightSidebar />
                </div>
              <Footer />
            </div>
          </ShipProvider>
      </MapContextProvider>
    </CanvasProvider>
    </AppContext>
  );
};

export default App;
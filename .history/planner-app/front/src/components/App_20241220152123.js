import '../styles/App.css';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import RightSidebar from './RightSidebar/RightSidebar';
import Header from './Header';
import Footer from './Footer';
import CanvasElements  from './MainContent/CanvasElements';
import { CanvasProvider } from './contexts/CanvasContext';
import { MapContextProvider } from './contexts/MapSelectorContext';
import { ShipProvider } from '../components/contexts/ShipContext';
import CanvasRenderer from '../factories/CanvasRender';

const App = () => {
  return (
    <CanvasProvider>
      <MapContextProvider>
          <ShipContext>
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
          </ShipContext>
      </MapContextProvider>
    </CanvasProvider>
  );
};

export default App;
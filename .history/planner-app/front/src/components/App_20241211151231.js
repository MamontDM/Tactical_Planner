import '../styles/App.css';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import RightSidebar from './RightSidebar/RightSidebar';
import Header from './Header';
import Footer from './Footer';
import CanvasElements  from './MainContent/CanvasElements';
import { CanvasProvider } from './contexts/CanvasContext';
import { ObjectProvider} from './contexts/ObjectContext';
import { MapContextProvider } from './contexts/MapSelectorContext';
import CanvasRenderer from '../factories/CanvasRender';

const App = () => {
  return (
    <CanvasProvider>
      <div className="app-wrapper">
        <Header />
        <div className="main-content">
        <MapContextProvider>
          <LeftSidebar />
            <CanvasElements />
                  <CanvasRenderer />
                <RightSidebar />
        </MapContextProvider>
        </div>
        <Footer />
      </div>
    </CanvasProvider>
  );
};

export default App;
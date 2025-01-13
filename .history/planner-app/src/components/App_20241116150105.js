import '../styles/App.css';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import RightSidebar from './RightSidebar/RightSidebar';
import Header from './Header';
import Footer from './Footer';
import CanvasElements  from './MainContent/CanvasElements';
import { CanvasProvider } from './contexts/CanvasContext';
import { ObjectProvider} from './contexts/ObjectContext';
import CanvasRenderer from '../factories/CanvasRender';

const App = () => {
  return (
    <CanvasProvider>
      <div className="app-wrapper">
        <Header />
        <div className="main-content">
          <LeftSidebar />
          <ObjectProvider>
            <CanvasElements>
                <CanvasRenderer />
                <RightSidebar />
                 
            </CanvasElements>
          </ObjectProvider>
        </div>
        <Footer />
      </div>
    </CanvasProvider>
  );
};

export default App;
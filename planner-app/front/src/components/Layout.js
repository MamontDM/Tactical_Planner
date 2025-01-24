import Header from './Header';
import Footer from './Footer';
import LeftSidebar from './LeftSidebar/leftSidebar';
import RightSidebar from './RightSidebar/RightSidebar';
import CanvasElements from './MainContent/CanvasElements';
import CanvasRenderer from '../factories/CanvasRender';
import '../styles/App.css';

const Layout = () => {
    return (
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
    );
};

export default Layout;

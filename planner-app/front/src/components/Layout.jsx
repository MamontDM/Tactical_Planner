import Footer from './Footer';
import LeftSidebar from './LeftSidebar/leftSidebar';
import RightSidebar from './RightSidebar/RightSidebar';
import CanvasElements from './MainContent/CanvasElements';
import CanvasRenderer from '../factories/CanvasRenderer';
import '../styles/App.css';
import ModalRoot from './shared/ModalWindows/ModalDashboard/ModalRoot';
import NotificationPortal from './shared/ModalWindows/Notification/NotificationPortal';
import { useMapSyncManager } from "../hooks/useMapSyncManager";

const Layout = () => {
    useMapSyncManager();
    return (
        <div className="app-wrapper">
            <div className="main-content">
                <LeftSidebar />
                <ModalRoot />
                <CanvasElements />
                <CanvasRenderer />
                <RightSidebar />
                <NotificationPortal/>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;

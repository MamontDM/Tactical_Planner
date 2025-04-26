import { useState, useEffect } from "react";
import { useModalStore } from "../../../../store/zustand/UserModalWindow/userModalController";
import UsersMap from "../../../LeftSidebar/ComponentList/DashboardSection/UserDashboard/UserMapStorage/UserMap";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root");

const MODAL_COMPONENTS = {
    usersMap: UsersMap,
}

const ModalRoot = () => {
    const { activeModal,  closeModal } = useModalStore();
    const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
        if (activeModal) {
          requestAnimationFrame(() => setIsVisible(true));
        }else{
          setIsVisible(false);
        }
      }, [activeModal]);

    if(!activeModal) return null;

    const Component = MODAL_COMPONENTS[activeModal];

    return ReactDOM.createPortal(
        <div 
        className={`modal-overlay ${isVisible ? "show" : ""}`}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
                    className="modal-close-button"
                    onClick={closeModal}
                    aria-label="Close modal"
                >
                    &times;
                </button>
                <Component />
            </div>
        </div>,
       modalRoot
    );
};
export default ModalRoot;
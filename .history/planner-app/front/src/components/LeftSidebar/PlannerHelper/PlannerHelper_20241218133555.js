import { useState } from 'react'; 
import ShipList from './components/ShipList/ShipList';
import ModalConfig from './components/ModalConfig/Modal';

const PlannerHelper = () =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [config, setConfig] = useState(null);

    const handleSaveConfig = (modalData) => {
        setConfig(modalData);
        setIsModalOpen(false);
    };

    return (
        <div className="planner-wrapper">
            <div className="planner__inputSection">
                 <button onClick={() => setIsModalOpen(true)}>Open Config Modal</button>    
            </div>
        </div>
    );
};

export default PlannerHelper;
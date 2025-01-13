import { useState } from 'react'; 
import ShipList from './components/ShipList/ShipList';
import ModalConfig from './components/ConfigList/Modal';

const PlannerHelper = () =>{
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [config, setConfig] = useState(null);

    const handleSaveConfig = (modalData) => {
        setConfig(modalData);
        setIsConfigOpen(false);
    };

    return (
        <div className="planner-wrapper">
            <div className="planner__inputSection">
                 <button onClick={() => setIsModalOpen(true)}>Open Config Modal</button>    
            </div>
            {isModalOpen && (
                <ModalConfig
                    onClose={() => setIsConfigOpen(false)}
                    onSave={handleSaveConfig}
                />
            )}
             {config && (
                <div className="planner__configSummary">
                    <h3>Selected Configuration</h3>
                    <pre>{JSON.stringify(config, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default PlannerHelper;
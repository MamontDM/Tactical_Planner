import { useState, useEffect } from 'react'; 
import { IconCruiser, IconAircraft_carrier, IconBattleship, IconDestroyer, IconSuper_ship, IconSubmarine } from '../../../assets/exportIcon';
import { ShipProvider } from '../../contexts/ShipContext';
import { useShipContext } from '../../../hooks/useShipContext';
import ConfigList from './components/ConfigList/ConfigList';
import ShipTemplate from './components/ShipListTemplate/ShipTemplate';


const PlannerHelperAfterProvider = () =>{
    const { config, updateConfigField, addLimitation, updateLimitation, removeLimitation } = useShipContext();
    const [isComplete, setIsComplete] = useState(false);

    const defaultConfig = {
        limitations: [],
        SuperShips: "0",
        Destroyers: "0",
        Cruisers: "0",
        Battleships: "0",
        Submarines: "0",
        Aircraft_Carriers: "0",
    };

    const shipTypes =  [
        {id: 1, label: 'SuperShips',  icon: IconSuper_ship, title: 'SB'},
        {id: 2, label: 'Destroyers' , icon: IconDestroyer, title: 'DD'},
        {id: 3, label: 'Cruisers',    icon: IconCruiser, title: 'BC' }, 
        {id: 4, label: 'Battleships', icon: IconBattleship, title: 'BB' },
        {id: 5, label: 'Submarines',  icon: IconSubmarine, title: 'SM'},
        {id: 6, label: 'Aircraft_Carriers',    icon: IconAircraft_carrier, title: 'CV'},
    ];

    const handleInputChange = (field, value) => {
        if(!isNaN(value) && Number(value) >= 0 && Number(value) <= 8){
           updateConfigField(field, value);
        }
    };

    return ( 
            <div className="planner-wrapper">
                <div className="planner-sidebar">
                    {!isComplete ? (
                        <>
                        <h3>Configure limitation</h3>
                        {shipTypes.map((type) => (
                                <div key={type.id} className="config-shipType-box">
                                        <img className="config-icon" src={type.icon} alt={type.label} />
                                        <h3>{type.title}</h3>
                                        <input
                                            className="config-input"
                                            type="number"
                                            value={config[type.label]}
                                            placeholder={'Qty . . .'}
                                            onChange={(e) => handleInputChange(type.label, e.target.value)}
                                        />
                                </div>
                            ))}
                    <h3>Special ship types limitation</h3>
                    <button onClick={addLimitation}>Add condition</button>
                        {config.limitations.length > 0 ? (
                        config.limitations.map((limitation) => (
                            <div key={limitation.id} className="limitation-box">
                                <input
                                    type="text"
                                    value={limitation.value}
                                    placeholder="Enter new limitation..."
                                    onChange={(e) => {
                                        updateLimitation(limitation.id, e.target.value)
                                    }}
                                />
                                <button
                                    onClick={() => removeLimitation(limitation.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'red',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                    }}
                                    title="Remove"
                                    >
                                    ❌
                                </button>
                            </div>
                        ))
                    ): null}
                    <button onClick={() => setIsComplete(true)}>Complete</button>
                        </>
                    ) : ( 
                    <div className="config-summary">
                            <h3>Configuration Summary</h3>
                        <ConfigList />
                        <ShipTemplate />
                        </div>
                    )}
                </div>
            </div>
    );
};

export default PlannerHelper;
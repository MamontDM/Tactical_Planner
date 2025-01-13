import { useState, useEffect } from 'react'; 
import './planner.css';
import { IconCruiser, IconAircraft_carrier, IconBattleship, IconDestroyer, IconSuper_ship, IconSubmarine } from '../../../../assets/exportIcon';
import { ShipProvider } from '../../../contexts/ShipContext';
import { useShipContext } from '../../../../hooks/useShipContext';
import ConfigList from './components/ConfigList/configList';
import ShipTemplate from './components/ShipListTemplate/ShipTemplate';


const PlannerHelper = () =>{
    const { config, updateConfigField, addLimitation, updateLimitation, removeLimitation } = useShipContext();
    const [isComplete, setIsComplete] = useState(false);


    const shipTypes =  [
        // {id: 1, label: 'SuperShips',  icon: IconSuper_ship, title: 'SB'},
        {id: 2, label: 'Destroyers' , icon: IconDestroyer, title: 'DD'},
        {id: 3, label: 'Cruisers',    icon: IconCruiser, title: 'BC' }, 
        {id: 4, label: 'Battleships', icon: IconBattleship, title: 'BB' },
        {id: 5, label: 'Submarines',  icon: IconSubmarine, title: 'SM'},
        {id: 6, label: 'AirCarriers', icon: IconAircraft_carrier, title: 'CV'},
    ];
    const superShipsTypes = [

    ]

    const handleInputChange = (field, value) => {
        if(!isNaN(value) && Number(value) >= 0 && Number(value) <= 8 && value.length <= 1){
           updateConfigField(field, Number(value));
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
                                            value={config[type.label] === 0 ? '' : config[type.label]}
                                            placeholder={'Qty . . .'}
                                            onChange={(e) => handleInputChange(type.label, e.target.value)}
                                        />
                                </div>
                            ))}
                            <div className="special-limitation">
                    <h3>Special ship types limitation</h3>
                    <button className="btn-addCondition" onClick={addLimitation}>Add Condition</button>
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
                    <button className="btn-complete" onClick={() => setIsComplete(true)}>Complete</button>
                    </div>
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
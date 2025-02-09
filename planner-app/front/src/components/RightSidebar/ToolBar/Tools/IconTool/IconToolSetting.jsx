import {useState} from 'react';
import { IconBattleship, IconCruiser, IconDestroyer, IconAircraft_carrier, IconSubmarine, switch_arrow, leftLavr, rightLavr} from '../../../../../assets/exportIcon';
import { useShipContext } from '../../../../../hooks/useShipContext';
import './IconToolSetting.css';

const IconToolSettings = ({ onChangeToolSettings }) => {

    const [settingSource, setSettingSource] = useState("manual");
    const { ships } = useShipContext();
    

    const shipList = Object.values(ships).flat();
    console.log(shipList);

    const handleSettingChange = (type, value) => {
            onChangeToolSettings(type, value);
    };

    const renderSettings = () => {
        if(settingSource === "manual"){
            return (
                <>
                <h3>Select ship type:</h3>
            <div className="ship-icon-list">
                <button className={'ship-button'}
                        data-type="shipType"
                        data-value="Submarine"
                        onClick={(e) => handleSettingChange(e.currentTarget.dataset.type, e.currentTarget.dataset.value)}>
                      <img className="ship-icon" src={IconSubmarine} alt="error" />
                </button>
                <button  className={'ship-button'} 
                        data-type="shipType"
                        data-value="Destroyer"
                        onClick={(e) => handleSettingChange(e.currentTarget.dataset.type, e.currentTarget.dataset.value)}>
                    <img className="ship-icon" src={IconDestroyer} alt="error" />
                </button>
                <button className={'ship-button'} 
                        data-type="shipType"
                        data-value="Cruiser"
                        onClick={(e) => handleSettingChange(e.currentTarget.dataset.type, e.currentTarget.dataset.value)}>
                    <img className="ship-icon" src={IconCruiser} alt="error" />
                </button>
                <button className={'ship-button'}
                        data-type="shipType"
                        data-value="Battleship"
                        onClick={(e) => handleSettingChange(e.currentTarget.dataset.type, e.currentTarget.dataset.value)}>
                    <img className="ship-icon" src={IconBattleship} alt="error" />
                </button>
                <button className={'ship-button'}
                        data-type="shipType"
                        data-value="AirCarrier"
                        onClick={(e) => handleSettingChange(e.currentTarget.dataset.type, e.currentTarget.dataset.value)}>
                    <img className="ship-icon" src={IconAircraft_carrier} alt="error" />
                </button>
               
            </div>
            <div className="spec-setting-manual">
                        <input 
                        type="text"
                        data-type="label"
                        placeholder="Set ship name"
                        onChange={(e) => handleSettingChange(e.target.dataset.type, e.target.value)} 
                        />
            </div>
                </>
            );
        } else if (settingSource === "list") {
            return (
                <>
                {shipList.lenght}
                    <div className="specset-block">
                        {shipList.map((ship, index) => (
                                <button className="specset-items"
                                    key={ship.id}
                                        onClick={() => handleSettingChange('shipFromList', {
                                            shipType: ship.class,
                                            label: ship.name,
                                        })
                                    }
                                    >
                                       {ship.tier === 11 ? ( 
                                        <div className="super-item">
                                            <img className="super-icon" src={leftLavr} alt="ErrorLavrIMG"></img>
                                            <p>{ship.name}</p>
                                            <img className="super-icon" src={rightLavr} alt="ErrorLavrIMG"></img>
                                            </div>
                                       ):(
                                        ship.name
                                    )}
                                </button>
                        ))}
                    </div>
                    </>
            );
        }
    };

    return (
        <>
            <div className="source-switch">
                <button 
                    onClick={() => setSettingSource("manual")}
                    className={settingSource === "manual" ? "toggle-active" : "toggle-pending"}
                    >
                    Manual Set
                </button>
                <img src={switch_arrow} alt="ErrorSwitchArrow"/>                
                <button 
                    onClick={() => setSettingSource("list")}
                    className={settingSource === "list" ? "toggle-active" : "toggle-pending"}
                    >
                   Planner List
                </button>
            </div>
            {renderSettings()}
        </>
    );
};

export default IconToolSettings;
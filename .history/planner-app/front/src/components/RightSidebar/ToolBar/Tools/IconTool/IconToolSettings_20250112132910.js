import {useEffect, useState} from 'react';
import { IconBattleship, IconCruiser, IconDestroyer, IconAircraft_carrier, IconSubmarine, switch_arrow} from '../../../../../assets/exportIcon';
import { useShipContext } from '../../../../../hooks/useShipContext';

const IconToolSettings = ({onChangeToolSettings}) => {

    const [settingSource, setSettingSource] = useState("manual");
    const { ships } = useShipContext();

    const shipList = Object.values(ships).flat();
 
   

    const [settings, setSettings] = useState({
        shipType: null,
        textColor: '#000000',
        shipLabel: 'USS',
    });

    const handleSetShipIcon = (icon) => {
        setSettings((prev) => ({ ...prev, shipType: icon }));
    };
    const handleSetColor = (color) => {
        setSettings((prev) => ({ ...prev, textColor: color }));
    };
    const handleSetLabel = (label) => {
        setSettings((prev) => ({ ...prev, shipLabel: label }));
    };

    useEffect(() => {
        if (onChangeToolSettings) {
            console.log(settings);
            onChangeToolSettings(settings);
        }
    }, [settings]);

    const shipSettingHandler = (ship) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            shipType: ship.class,
            shipLabel: ship.name,
            textColor: '#07fc03',
        }));
    };

    const renderSettings = () => {
        if(settingSource === "manual"){
            return (
                <>
                <h3>Select ship type:</h3>
            <div className="ship-icon-list">
                <button className={`ship-button ${settings.shipType === 'submarine' ? 'selected' : ''}`}
                        onClick={() => handleSetShipIcon('Submarine')}>
                      <img className="ship-icon" src={IconSubmarine} alt="error" />
                </button>
                <button className={`ship-button ${settings.shipType === 'destroyer' ? 'selected' : ''}`} 
                        onClick={() => handleSetShipIcon('Destroyer')}>
               <img className="ship-icon" src={IconDestroyer} alt="error" />
                </button>
                <button className={`ship-button ${settings.shipType === 'cruiser' ? 'selected' : ''}`} 
                        onClick={() => handleSetShipIcon('Cruiser')}>
                      <img className="ship-icon" src={IconCruiser} alt="error" />
                </button>
                <button className={`ship-button ${settings.shipType === 'battleship' ? 'selected' : ''}`}
                        onClick={() => handleSetShipIcon('Battleship')}>
                      <img className="ship-icon" src={IconBattleship} alt="error" />
                </button>
                <button className={`ship-button ${settings.shipType === 'air_carrier' ? 'selected' : ''}`}
                        onClick={() => handleSetShipIcon('AirCarrier')}>
                      <img className="ship-icon" src={IconAircraft_carrier} alt="error" />
                </button>
               
            </div>
            <div className="spec-setting-manual">
                <h4>Set Icon Color:</h4>
                    <input 
                        type="color" 
                        onChange={(e) => handleSetColor(e.target.value)} 
                        defaultValue={settings.textColor} 
                        />
                <h4>Set Label:</h4>
                        <input 
                        type="text" 
                        onChange={(e) => handleSetLabel(e.target.value)} 
                        defaultValue={settings.shipLabel} 
                        />
            </div>
                </>
            );
        } else if (settingSource === "list") {
            return (
                <>
                    <h3>From list</h3>
                    <div className="specset-block">
                        {ship.map((ship) => (
                            <div className="specset-items">
                                <button key={ship.id} 
                                        onClick={() => shipSettingHandler(ship)}
                                        >
                                        {ship.name}
                                </button>
                                </div>
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
                    className={settingSource === "manual" ? "toggle-active" : ""}
                    >
                    Manual Set
                </button>
                <img  src={switch_arrow}/>                
                <button 
                    onClick={() => setSettingSource("list")}
                    className={settingSource === "list" ? "toggle-active" : ""}
                    >
                   Planner List
                </button>
            </div>
            {renderSettings()}
        </>
    );
};

export default IconToolSettings;
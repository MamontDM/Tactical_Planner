import {useEffect, useState} from 'react';
import { IconBattleship, IconCruiser, IconDestroyer, IconAircraft_carrier, IconSubmarine} from '../../../../../assets/exportIcon';
import { useShipContext } from '../../../../../hooks/useShipContext';

const IconToolSettings = ({onChangeToolSettings}) => {

    const [settingSource, setSettingSource] = useState("manual");
    const { selectedShip } = useShipContext();

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
            <h3>Set Icon Color:</h3>
                <input 
                    type="color" 
                    onChange={(e) => handleSetColor(e.target.value)} 
                    defaultValue={settings.textColor} 
                    />
            <h3>Set Label:</h3>
                <input 
                    type="text" 
                    onChange={(e) => handleSetLabel(e.target.value)} 
                    defaultValue={settings.shipLabel} 
                    />
                </>
            );
        } else if (settingSource === "list") {
            return (
                <>
                    <h3>From list</h3>
                    <div className="specset-block">
                        {selectedShip.map((ship) => (
                            <div className="specset-items">
                                <button key={ship.id} 
                                        onClick={() => shipSettingHandler(ship)}
                                        >
                                            {"<<"} {ship.name} {">>"}
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
                <button onClick={() => setSettingSource("manual")}>Manual</button>
                <button onClick={() => setSettingSource("list")}>List</button>
            </div>
            {renderSettings()}
        </>
    );
};

export default IconToolSettings;
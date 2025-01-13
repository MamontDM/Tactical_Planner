import {useEffect, useState} from 'react';
import { IconBattleship, IconCruiser, IconDestroyer} from '../../../../../assets/exportIcon';
import { selectedShip } from '../../../../contexts/ShipContext';

const IconToolSettings = ({onChangeToolSettings}) => {
    const [settingSource, setSettingSource] = useState("manual");
   
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
            onChangeToolSettings(settings);
        }
    }, [settings]);


    const renderSettings = () => {
        if(settingSource === "manual"){
            return (
                <>
                <h3>Select ship type:</h3>
            <div className="ship-icon-list">
                <button className={`ship-button ${settings.shipType === 'destroyer' ? 'selected' : ''}`} 
                        onClick={() => handleSetShipIcon('destroyer')}>
               <img className="ship-icon" src={IconDestroyer} alt="error" />
                </button>
                <button className={`ship-button ${settings.shipType === 'cruiser' ? 'selected' : ''}`} 
                        onClick={() => handleSetShipIcon('cruiser')}>
                      <img className="ship-icon" src={IconCruiser} alt="error" />
                </button>
                <button className={`ship-button ${settings.shipType === 'battleship' ? 'selected' : ''}`}
                        onClick={() => handleSetShipIcon('battleship')}>
                      <img className="ship-icon" src={IconBattleship} alt="error" />
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
            <h3>From list</h3>
            {selectedShip.map((ship) => (
                <button key={ship.id} onClick={() => setSettings(ship)}>
                    {ship.name}
                </button>
            ))}
        }
    }

return 
};

export default IconToolSettings;
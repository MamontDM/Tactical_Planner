import React from 'react';
import './shipCard.css';
import { useShipContext } from '../../../../../.././../hooks/useShipContext'  
import {EU, FRA, GER, UK, USA, USSR, SP, ITA, PA, PANASIA, JP, CB, SM, CV, DD, BB, NED, PREM } from '../../../../../../../assets/exportShipCard';


const ShipListCard = ({ship, viewType = 'card' }) => {
    console.log(ship);
   const [shipData] = ship;
   const {removeShip} = useShipContext();
   const { id, name, tier, nation, class: className } = shipData;

    const nationIcons = {
        usa: USA,
        pan_america: PA, 
        japan: JP,
        europe: EU,
        pan_asia: PANASIA,
        ussr: USSR,
        france: FRA,
        uk: UK,
        italy: ITA,
        germany: GER,
        spain: SP,
        netherlands: NED,
    };
    const shipTier = {
        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV',
        5: 'V',
        6: 'VI',
        7: 'VII',
        8: 'VIII',
        9: 'IX',
        10: 'X',
        11: 'XI',
    };
    const classIcon = {
        Submarine: SM, 
        Destroyer: DD,
        Cruiser: CB, 
        Battleship: BB,
        AirCarrier: CV,
        SuperShip: PREM,
    };

    if (viewType === 'button') {
        return (
            <button key={id} className="ship-button">
                <img src={classIcon[className]} alt={`${className} icon`} className="class-icon" />
                <span className="ship-name">{name}</span>
            </button>
        );
    }

    return ( 
        <>
            <div key={id} className="ship-list-item">
                    <img src={classIcon[className]} alt={`${className} icon`} className="class-icon" />
                    <div className="ship-info">
                    <div className="ship-name">{name}</div>
                    <div className="ship-tier">Tier: {shipTier[tier]}</div>
                </div>
                <img src={nationIcons[nation]} alt={`${nation} flag`} className="nation-icon" />
                 <button onClick={() => removeShip(ship)}>Remove</button>
            </div>
           
        </>
    )
};


export default ShipListCard;
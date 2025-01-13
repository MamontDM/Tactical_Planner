import React from 'react';
import {EU, FRA, GER, UK, USA, USSR, SP, ITA, PA, PANASIA, JP, CB, SM, CV, DD, BB, NED, PREM } from '../../../../../../assets/exportShipCard';


const ShipListCard = ({ship}) => {
   const [shipData] = ship;
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

   
    return ( 
        <div key={id} className="ship-list-item">
            <img src={nationIcons} alt={`${nation} flag`} className="nation-icon" />
            <img src={classIcon} alt={`${className} icon`} className="class-icon" />
            <div className="ship-info">
            <div className="ship-name">{name}</div>
            <div className="ship-tier">Tier: {shipTier}</div>
        </div>
      </div>
    )
};


export default ShipListCard;
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
        Destoyer: DD,
        Cruiser: CB, 
        Battleship: BB,
        AirCarrier: CV,
        SuperShip: PREM,
    };

   
    return ( 
        <div>
            {ship.map(({class: className, id, images, name, tier, nation}) => (
                <div key={id} className="ship-list-item">
                    {nation}{name} {tier} 
                </div>
            ))}
        </div>
    )
};


export default ShipListCard;
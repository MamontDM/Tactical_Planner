import React from 'react';
import { IconCruiser, IconAircraft_carrier, IconBattleship, IconDestroyer, IconSuper_ship, IconSubmarine } from '../../../../../assets/Icon/exportIcon.js';

const ConfigList = ({props}) => {
    const { limitations, ...shipCongif } = props;
    
    const shipIcons = {
        'Aircraft Carriers': IconAircraft_carrier,
        SuperShips: IconSuper_ship,
        Battleships: IconBattleship,
        Cruisers: IconCruiser,
        Destroyers: IconDestroyer,
        Submarines: IconSubmarine,
    }
};

export default ConfigList;
import React,  { useEffect }  from 'react';
import { useShipContext } from '../../../../../hooks/useShipContext'
import ShipList from '../ShipList/ShipList';

const ShipTemplate = () => {

        const { config, selectedShip } = useShipContext();
        const types = Object.entries(config).filter(([key]) => key !== 'limitations');
 
    return (
        <div className="ship-template">
            {types.map(([type, limit]) => (
                limit > 0 && (
                <div key={type} className="ship-type">
                    <span>{type} /{limit}</span>
                    <div className="ship-placeholder">
                        {[...Array(limit)].map((_, index) => (
                            <div key={index} className="palceholder">
                                <ShipList type={type} />
                            </div>
                        ))}
                    </div>
                </div>
                )
            ))}
        </div>
    );
};

export default ShipTemplate;
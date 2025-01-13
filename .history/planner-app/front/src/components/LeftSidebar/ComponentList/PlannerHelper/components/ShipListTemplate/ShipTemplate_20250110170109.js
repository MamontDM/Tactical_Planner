import React,  { useEffect }  from 'react';
import { useShipContext } from '../../../../../../hooks/useShipContext'
import ShipList from '../ShipList/shipList';
import './shipListTemplate.css';

const ShipTemplate = () => {

        const { config } = useShipContext();
        const types = Object.entries(config).filter(([key]) => key !== 'limitations');

        return (
        <div className="ship-template">
            {types.map(([type, limit]) => (
                limit > 0 && (
                <div key={type} className="ship-type">
                    <span>{type}</span>
                    <div className="ship-placeholder">
                        <ShipList type={type} limit={limit} />
                    </div>
                </div>
                )
            ))}
        </div>
    );
};

export default ShipTemplate;
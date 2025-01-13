import React from 'react';
import { useShipContext } from '../../../../../hooks/useShipContext'

const ShipTemplate = () => {

        const { config } = useShipContext();

        const types = Object.entries(config).filter(([key]) => key !== 'limitations');

    return (
        <div className="ship-template">
            
            {types.map(([type, limit]) => (
                <div key={type} className="ship-type">
                    <h4>{type} ({limit} ships)</h4>
                    <div className="ship-placeholder">
                        {[...Array(limit)].map((_, index) => (
                            <div key={index} className="palceholder">
                                <span>Empty Slot</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShipTemplate;
import { useState } from 'react'; 
import ShipList from './components/ShipList/ShipList';

const PlannerHelper = () =>{
    const [numberOfShips, setNumberOfShips] = useState(0);
    const [numberOfBans, setNumberOfBans] = useState(0);

    return (
        <div className="planner-wrapper">
            <div className="planner__inputSection">
            </div>
         
        </div>
    );
};

export default PlannerHelper;
import { useState } from 'react'; 
import ShipList from './components/ShipList/ShipList';

const PlannerHelper = () =>{
    const [numberOfShips, setNumberOfShips] = useState(0);
    const [numberOfBans, setNumberOfBans] = useState(0);

    return (
        <div className="planner-wrapper">
            <div className="planner__inputSection">
            </div>
          {numberOfShips > 0 && ( <ShipList 
            title="Pick List"
            numberOfItems={numberOfShips}
            placeholder="Enter ship name" 
            /> 
          )}
           {numberOfBans > 0 && (<ShipList 
            title="Ban List"
            numberOfItems={numberOfBans}
            placeholder="Enter ship name" 
            />
           )}            
        </div>
    );
};

export default PlannerHelper;
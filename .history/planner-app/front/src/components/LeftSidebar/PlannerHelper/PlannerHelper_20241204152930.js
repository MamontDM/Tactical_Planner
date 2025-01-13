import { useRef } from 'react'; 

const PlannerHelper = () =>{

    const numberOfShips = useRef(null);
    const value = useRef(null);

    const renderTeamSet = (value) =>{
        
    };

    return (
        <div className="planner-wrapper">
            <label> Set up ship type and qty</label>
            <select>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="9">9</option>
            </select>
        <div className="pickShipList">

        </div>
        <div className="banShipList">

        </div>
        </div>
    )
};

export default PlannerHelper;
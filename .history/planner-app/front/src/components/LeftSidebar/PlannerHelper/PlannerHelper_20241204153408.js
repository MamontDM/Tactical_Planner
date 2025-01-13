import { useState } from 'react'; 

const PlannerHelper = () =>{
    const [numberOfShips, setNumberOfShips] = useState(5);


    const renderTeamSet = () =>{
        const fields = [];
        for (let i = 0; i < numberOfShips; i++){
            fields.push(
                <div key={i} className="ship-input">
                    <label>Ship {i + 1}</label> 
                    <input type="text" placeholder="Enter ship name" />
                </div>
            );
        }
        return fields;
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
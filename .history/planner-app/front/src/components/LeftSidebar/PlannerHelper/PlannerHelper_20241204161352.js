import { useState } from 'react'; 

const PlannerHelper = () =>{
    const [numberOfShips, setNumberOfShips] = useState(0);
    const [numberOfBans, setNumberOfBans] = useState(0);

    const renderShipSet = () =>{
        const fields = [];
console.log()
        for (let i = 0; i < numberOfBans; i++){
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
            <div className="planner-inputSection">
            <label> Number of ships </label>
            <select
                value={numberOfShips}
                onChange={(e) => setNumberOfShips(Number(e.target.value , e.target.id))}
                >
                <option value="0">Choose quantity</option>
                <option id="pick" value="5">5</option>
                <option id="pick" value="7">7</option>
                <option id="pick" value="9">9</option>
            </select>
            <label> Number of bans </label>
            <select
                value={numberOfBans}
                onChange={(e) => setNumberOfBans(Number(e.target.value))}
                >
                <option value="0">Choose quantity</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            </div>
        <div className="pickShipList">
            <h3>Pick ship</h3>
            {renderShipSet()}
        </div>
            <div className="banShipList">
                <h3>Banned Ships</h3>
                {renderShipSet()}
            </div>
        </div>
    )
};

export default PlannerHelper;
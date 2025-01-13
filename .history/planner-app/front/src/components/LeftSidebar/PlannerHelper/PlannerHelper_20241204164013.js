import { useState } from 'react'; 

const PlannerHelper = () =>{
    const [numberOfShips, setNumberOfShips] = useState(0);
    const [numberOfBans, setNumberOfBans] = useState(0);

    const renderShipSet = () =>{
        const pickFields = [];
        const banFields = [];

        for (let i = 0; i < numberOfShips; i++){
            pickFields.push(
                <div key={i} className="ship-input">
                    <label>Ship {i + 1}</label> 
                    <input type="text" placeholder="Enter ship name" />
                </div>
            );
        }
        for (let i = 0; i < numberOfBans; i++) {
            banFields.push(
              <div key={`ban-${i}`} className="ship-input">
                <label>Ban Ship {i + 1}</label>
                <input type="text" placeholder="Enter ship name" />
              </div>
            );
          }

        return (
      <>
        <div className="pickShipList">
          <h3>Pick Ships</h3>
          {pickFields}
        </div>
        <div className="banShipList">
          <h3>Ban Ships</h3>
          {banFields}
        </div>
      </>
    );
  };

    return (
        <div className="planner-wrapper">
            <div className="planner__inputSection">
            <label> Number of ships </label>
            <select
                value={numberOfShips}
                onChange={(e) => setNumberOfShips(Number(e.target.value))}
                >
                <option value="0">Choose quantity</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="9">9</option>
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
           {renderShipSet()}
           <div className="planner-ships-restrictions"></div>
        </div>

    );
};

export default PlannerHelper;
import { useRef } from 'react'; 

const PlannerHelper = () =>{

    const numberOfShips = 25;




    return (
        <>
        <label> {numberOfShips}</label>
        <div className="pickShipList">
            
        </div>
        <div className="banShipList">

        </div>
        </>
    )
};

export default PlannerHelper;
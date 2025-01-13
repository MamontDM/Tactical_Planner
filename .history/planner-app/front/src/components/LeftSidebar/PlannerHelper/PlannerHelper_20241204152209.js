import { useRef } from 'react'; 

const PlannerHelper = () =>{

    const numberOfShips = useRef(null);




    return (
        <>
        <select>
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="9">9</option>
            <option value={value}></option>
        </select>
        <div className="pickShipList">
            
        </div>
        <div className="banShipList">

        </div>
        </>
    )
};

export default PlannerHelper;
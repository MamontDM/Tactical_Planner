import { useRef } from 'react'; 

const PlannerHelper = () =>{

    const numberOfShips = useRef(null);




    return (
        <>
        <select>
            <option>5</option>
            <options>7</options>
            <options>9</options>
            <options>
                <input
                type="number">
                </input>
            </options>
        </select>
        <div className="pickShipList">
            
        </div>
        <div className="banShipList">

        </div>
        </>
    )
};

export default PlannerHelper;
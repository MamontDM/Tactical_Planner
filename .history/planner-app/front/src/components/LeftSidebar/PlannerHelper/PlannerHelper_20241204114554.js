import { useRef } from 'react'; 

const PlannerHelper = () =>{

    const numberOfShips = useRef(null);




    return (
        <>
        <div className="pickShipList">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </div>
        <div className="banShipList">
             <li></li>
            <li></li>
            <li></li>
        </div>
        </>
    )
};

export default PlannerHelper;
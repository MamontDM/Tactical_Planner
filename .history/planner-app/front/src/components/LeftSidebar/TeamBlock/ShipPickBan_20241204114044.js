import { useRef } from 'react'; 

const ShipPickBanList = () =>{

    const numberOfShips = useRef(null);




    return (
        <div clssName="pickShipList">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </div>
        <div clssName="banShipList">
             <li></li>
            <li></li>
            <li></li>
        </div>
    )
};

export default ShipPickBanList;
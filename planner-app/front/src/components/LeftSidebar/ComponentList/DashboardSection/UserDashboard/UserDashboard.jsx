import { useModalStore } from "../../../../../store/zustand/UserModalWindow/userModalController";


const UserDashboard = () => {
    const { openModal } = useModalStore();

    return (
            <div className="user-card-nav">
            <button 
                onClick={() => openModal("usersMap")}
            >
                Map Storage</button>
            <button>Join Session</button>
    </div>
    )
};

export default UserDashboard;


const ClickToBase = () => {

        const fetchShips = async () =>{
            try {
                  const response = await fetch('api/ships')
            } catch (error) {
              console.error('Error fetching by ID ships: ', error.message);
            }
       }

    return (
        <button
            onclick={fetchShips}
        >Click to base</button>
    )
};

export default ClickToBase;
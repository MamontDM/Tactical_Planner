

const ClickToBase = () => {

        const fetchShips = async () =>{
            try {
                  const response = await fetch('api/ships');
                  if(!response.ok){
                    throw new Error("Failed to fetch all ships!");
                  }
                  const data = await response.json();
            } catch (error) {
              console.error('Error fetching by ID ships: ', error.message);
            }
       }

    return (
        <button
            onClick={fetchShips}
        >Click to base</button>
    )
};

export default ClickToBase;
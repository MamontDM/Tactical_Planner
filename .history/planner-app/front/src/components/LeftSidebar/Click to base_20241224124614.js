

const ClickToBase = () => {

   
        const fetchSelectedShips = async () =>{
            try {
                  const response = await fetch('api/ships')
            } catch (error) {
              console.error('Error fetching by ID ships: ', error.message);
            }
       }

    return (
        <button
            onclick={fetchToBase}
        >Click to base</button>
    )
};

export default ClickToBase;
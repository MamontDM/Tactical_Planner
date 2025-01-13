const axios = require('axios');

const url = "https://api.worldofwarships.eu/wows/encyclopedia/ships/?application_id=dbd5754ce93a204aa7632c155fe229b7";


async function fetchApiWg() {
    try{
        const response = await axios.get(url);

        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Response data:", data)
    }catch (error){
        console.log("Error fetching API data:", error.message);
    }
}

fetchApiWg();
const fetch = require('axios');

const url = "https://api.worldofwarships.eu/wows/encyclopedia/ships/?application_id=7ad1aae2aa5a2b075f6ac7fc6aabdf98";


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
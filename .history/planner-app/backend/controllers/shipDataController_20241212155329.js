

const getShipData = async () => {
    try {
        const shipDataRequest = querystring.stringify({
            application_id: 'dbd5754ce93a204aa7632c155fe229b7',
            fields: 'name',
        });

        const apiResponse = await makeGETRequest(
            'https://api.worldofwarships.eu/wows/encyclopedia/ships/?' + shipDataRequest
        );

        if (!apiResponse || !apiResponse.data) {
            console.error('API ответ неверный:', apiResponse);
            throw new Error('Ошибка при получении данных от API');
        }

        const processedData = processShipData(apiResponse.data);
        return processedData;
    } catch (error) {
        console.error('Ошибка при выполнении getShipData:', error.message);
        throw error;
    }
};
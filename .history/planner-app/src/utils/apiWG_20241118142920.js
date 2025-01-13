export async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Ошибка при запросе данных пользователя:', error);
        throw error; // Пробрасываем ошибку дальше
    }
}

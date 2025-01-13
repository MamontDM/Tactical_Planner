import React, { useState, useEffect } from 'react';

function AuthButton() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const auth = localStorage.getItem('isAuthenticated');
        if (auth === 'true') {
            setIsAuthenticated(true);
            const nickname = localStorage.getItem('nickname');
            setUserName(nickname || '');
        }
    }, []);

    const handleLogin = () => {
        window.location.href = 'https://127.0.0.1:5000/api/login'; // URL вашего маршрута логина
    };

    // Функция для логаута
    const handleLogout = async () => {
        try {
            const response = await fetch('https://127.0.0.1:5000/api/logout', {
                method: 'POST',
                credentials: 'include', // Чтобы отправить куки с сессией
            });

            if (response.ok) {
                // Удаляем данные аутентификации
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('nickname');
                setIsAuthenticated(false);
                setUserName('');
            } else {
                console.error('Ошибка при логауте');
            }
        } catch (error) {
            console.error('Ошибка запроса логаута:', error);
        }
    };

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <p>Добро пожаловать, {userName}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    );
}

export default AuthButton;

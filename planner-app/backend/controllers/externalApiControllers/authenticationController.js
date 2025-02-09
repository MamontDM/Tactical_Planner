const axios = require('axios');
const { app_id } = require('../../config');
const { getProfileData } = require('./userDataController');
const { saveToCache, getFromCache, deleteFromCache, cacheHasKey } = require('../../controllers/redisControlers/cacheRedis');
const { isProduction, prodServOrigins, devServOrigins, domainPROD, domainDEV, devFrontOrigins, prodFrontOrigins  } = require('../../config');


exports.login = (req, res) =>{ 
    const applicationId = app_id;
    const redirectUri = `${isProduction ? prodServOrigins : devServOrigins}/auth/response`;

    const wargamingAuthUrl = `https://api.worldoftanks.eu/wot/auth/login/?application_id=${applicationId}&redirect_uri=${encodeURIComponent(redirectUri)}`
    
    res.redirect(wargamingAuthUrl);

};

exports.response = async (req, res) => {

    const { access_token, account_id, expires_at, nickname } = req.query;

    if (!access_token || !account_id || !expires_at || !nickname) {
        return res.status(400).json({ error: 'Некорректный ответ от API' });
    }

    getProfileData(account_id, nickname);


    const cookieData = {
        access_token,
        expires_at: parseInt(expires_at, 10) * 1000,
        account_id,
        nickname
    };

    await saveToCache(`auth:${account_id}`, cookieData, 600)
    
    
  console.log(` Cookies сохранены в Redis: cookies:${account_id}`);

  const redirectUrl = `${isProduction ? prodFrontOrigins : devFrontOrigins}?account_id=${account_id}`;

  res.redirect(redirectUrl);
};

exports.checkAuthStatus = async (req, res) => {
    const { account_id } = req.query;

        if (!account_id) {
            return res.status(400).json({ isAuthenticated: false, error: "Не указан account_id" });
        }

    try {
        const userData = await getFromCache(`auth:${account_id}`);
        if(!userData){
            return res.status(401).json({ isAuthenticated: false, error: "Нет данных в Redis" });
        }
        console.log(`Data found in Redis: auth:${account_id}`);
        console.log(isProduction);
        res.cookie("access_token", userData.access_token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'None' : 'Lax',
            maxAge: userData.expires_at,
            domain: isProduction ? domainPROD : domainDEV,
            path: "/",
        });

        res.status(200).json({
            isAuthenticated: true,
            account_id: userData.account_id,
            nickname: userData.nickname,
        });


    } catch (error) {
        console.error("Ошибка при проверке аутентификации:", error.message);
        res.status(500).json({ isAuthenticated: false, error: "Ошибка сервера" });
    }

};


exports.logOut = async (req, res) => {
        try {
            const access_token = req.cookies.access_token;
            const applicationId = app_id;
            const { id } = req.query
            console.log(id);

            if (!access_token || !applicationId) {
                return res.status(200).json({ message: 'Already logged out' });
            }
            await axios.post('https://api.worldoftanks.eu/wot/auth/logout/', null, {
            params: {
                    application_id: applicationId,
                    access_token: access_token,
                },
        });
        const cookieOptions = {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'None' : 'Lax',
            maxAge: 0,
            domain: isProduction ? domainPROD : domainDEV,
            path: "/",
        };

        res.clearCookie('access_token', cookieOptions);

        try {
            const cacheKey =`auth:${id}`;
            const cacheExists = await cacheHasKey(cacheKey);
            if (!cacheExists) {
                console.warn(`Cache key ${cacheKey} not found.`);
            } else {
                await deleteFromCache(cacheKey);
                console.log(`Cache key ${cacheKey} successfully deleted.`);
            }
        } catch (error) {
            console.error('Error during Redis cache deletion:', redisError.message);
            return res.status(500).json({ error: 'Error during cache deletion' });
        }

        return res.status(200).json({message: "Logout success"});
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({error: 'Error axios req to API'});
    }
};
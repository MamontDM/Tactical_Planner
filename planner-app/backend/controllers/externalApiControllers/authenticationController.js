const axios = require('axios');
const { app_id } = require('../../config');
const jwt = require('jsonwebtoken');
const { getProfileData } = require('./userDataController');
const FRONT_URL = process.env.VERCEL_ORIGIN;
const RENDER_ORIGIN = process.env.RENDER_ORIGIN;


exports.login = (req, res) =>{ 
    const applicationId = app_id;
    const redirectUri = `${RENDER_ORIGIN}/auth/response`;

    const wargamingAuthUrl = `https://api.worldoftanks.eu/wot/auth/login/?application_id=${applicationId}&redirect_uri=${encodeURIComponent(redirectUri)}`

    return res.redirect(wargamingAuthUrl);
};

exports.response = async (req, res) => {
    const { access_token, account_id, expires_at, nickname } = req.query;

    if (!access_token || !account_id || !expires_at || !nickname) {
        return res.status(400).json({ error: 'Некорректный ответ от API' });
    }
    const token = jwt.sign({account_id, nickname}, process.env.JWT_SECRET, {
        expiresIn: parseInt(expires_at, 10),
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: parseInt(expires_at, 10) * 1000,
    });

    getProfileData(account_id, nickname);

    res.redirect(FRONT_URL);
    
};

exports.checkAuthStatus = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        console.log('Токен отсутствует');
        return res.json({ isAuthenticated: false });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        res.json({
            isAuthenticated: true,
            user: {
                account_id: decoded.account_id,
                nickname: decoded.nickname,
            },
        });
    } catch (error) {
        console.error('Error decoding', error.message);
        res.json({isAuthenticated: false});
    }
};


exports.logOut = async (req, res) => {

    const token = req.cookies.token;
     const applicationId = app_id;

     if (!token) {
        return res.status(400).json({ error: 'Токен отсутствует' });
    }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const access_token = decoded.access_token;
            const applicationId = app_id;

            const response = await axios.post('https://api.worldoftanks.eu/wot/auth/logout/', 
                null,
                {params: {
                    application_id: applicationId,
                    access_token: access_token,
                },
            }
        );
     res.clearCookie('token');
     res.status(200).json({message: 'Logout success' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({error: 'Error axios req to API'});
    }
};
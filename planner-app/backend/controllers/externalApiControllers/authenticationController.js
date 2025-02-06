const axios = require('axios');
const { app_id } = require('../../server');
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
    req.session.user = { access_token, account_id, nickname };

    getProfileData(account_id, nickname);

    res.redirect(FRONT_URL);
    
};

exports.checkAuthStatus = (req, res) => {
    console.log('Called request')
    if (req.session.user) {
        console.log('true')
        res.json({ isAuthenticated: true, user: req.session.user });
    } else {
        console.log('true') 
        res.json({ isAuthenticated: false });
    }
};


exports.logOut = async (req, res) => {

    const {access_token} = req.session.user;
     const applicationId = app_id;

    if (!access_token) {
        return res.status(400).json({ error: 'Токен отсутствует' });
    }
        try {
            const response = await axios.post('https://api.worldoftanks.eu/wot/auth/logout/', 
                null,
                {params: {
                    application_id: applicationId,
                    access_token: access_token,
                },
            }
        );
        req.session.destroy(() => {
            res.status(200).json({message: 'LogOut success'});
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({error: 'Error axios req to API'});
    }
};
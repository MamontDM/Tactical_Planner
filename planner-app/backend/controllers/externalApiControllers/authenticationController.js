const axios = require('axios');
const { getProfileData } = require('./userDataController');



exports.login = (req, res) =>{ 
    console.log('called')
    const applicationId = 'dbd5754ce93a204aa7632c155fe229b7'
    const redirectUri = 'http://localhost:5000/auth/response';

    const wargamingAuthUrl = `https://api.worldoftanks.eu/wot/auth/login/?application_id=${applicationId}&redirect_uri=${encodeURIComponent(redirectUri)}`

    return res.redirect(wargamingAuthUrl);
};

exports.response = async (req, res) => {
    const { access_token, account_id, expires_at, nickname } = req.query;

    if (!access_token || !account_id || !expires_at || !nickname) {
        return res.status(400).json({ error: 'Некорректный ответ от API' });
    }
    req.session.user = { access_token, account_id, nickname };

    getProfileData(req, null).catch((error) => {
        console.error('Ошибка при загрузке профиля:', error.message);
    });

    res.redirect(`http://localhost:3000/`);
    
};

exports.checkAuthStatus = (req, res) => {
    if (req.session.user) {
        res.json({ isAuthenticated: true, user: req.session.user });
    } else {
        res.json({ isAuthenticated: false });
    }
};


exports.logOut = async (req, res) => {

    const {access_token} = req.session.user;
     const applicationId = 'dbd5754ce93a204aa7632c155fe229b7'

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
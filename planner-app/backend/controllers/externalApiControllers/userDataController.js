const { makeGETRequest, makePOSTRequest } = require('../../httpservice');
const querystring = require('querystring');
const saveUserDB = require('../InternalApiControllers/userDbDataController')


exports.getProfileData = async (req, res) => {
  const player_id =  req.session.user.account_id;
  const nickname =  req.session.user.nickname;


  if (!nickname || !player_id) {
    if (res) {
      return res.status(401).json({ error: 'Такого пользователя не существует!' });
    }
    throw new Error('Такого пользователя не существует!');
  }

  const profileRequest = querystring.stringify({
    application_id: 'dbd5754ce93a204aa7632c155fe229b7',
    account_id: player_id,
    extra: 'clan',
    fields: 'clan.tag,role,account_name',
  });

  const statisticsRequest = querystring.stringify({
    application_id: 'dbd5754ce93a204aa7632c155fe229b7',
    account_id: player_id,
    fields: 'statistics.pvp',
  });


  try {
    const profileData = await makeGETRequest('https://api.worldofwarships.eu/wows/clans/accountinfo/?' + profileRequest);
    if (!profileData || !profileData.data || !profileData.data[player_id]) {
      throw new Error('Данные профиля отсутствуют или неверного формата');
    }

    const statisticsData = await makeGETRequest('https://api.worldofwarships.eu/wows/account/info/?' + statisticsRequest);
    if (!statisticsData || !statisticsData.data || !statisticsData.data[player_id]) {
      throw new Error('Данные статистики отсутствуют или неверного формата');
    }

    const rawProfile = {
      ...profileData.data[player_id],
      ...statisticsData.data[player_id],
    };

    const userProfile = { 
      id: player_id || 'empty',
      name: rawProfile.account_name || 'empty',
      clanTag: rawProfile.clan?.tag || 'empty',
      role: rawProfile.role || 'empty',
      battles: rawProfile.statistics?.pvp?.battles || 'empty',
      wins: rawProfile.statistics?.pvp?.wins || 'empty',
      losses: rawProfile.statistics?.pvp?.losses || 'empty',
      frags: rawProfile.statistics?.pvp?.frags || 'empty',
      survived_battles: rawProfile.statistics?.pvp?.survived_battles || 'empty',
      damage_dealt: rawProfile.statistics?.pvp?.damage_dealt || 'empty',
      max_damage_dealt: rawProfile.statistics?.pvp?.max_damage_dealt || 'empty',
      max_plane_killed: rawProfile.statistics?.pvp?.max_planes_killed || 'empty',
    };

    await saveUserDB.saveOrUpdateUserProfile({body: {nickname, userProfile}}, res);

    if (res) {
      return res.json( userProfile);
    }
    return userProfile;

  } catch (error) {
    if (res) {
      return res.status(500).json({ error: 'Ошибка при получении данных профиля' });
    }
    throw error;
  }
};

// exports.getProfileFromCache = (req, res) => {
//   const { nickname } = req.session.user;

//   if (!nickname) {
//       return res.status(401).json({ error: 'Пользователь не найден в сессии' });
//   }

//   const cachedProfile = userCache.getData(nickname);
//   if (!cachedProfile) {
//       return res.status(404).json({ error: 'Данные профиля отсутствуют в кэше' });
//   }

//   res.json({ profile: cachedProfile });
// };




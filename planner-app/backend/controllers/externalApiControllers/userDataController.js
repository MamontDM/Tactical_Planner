const { makeGETRequest, makePOSTRequest } = require('../../httpservice');
const { app_id } = require('../../server');
const querystring = require('querystring');
const saveUserDB = require('../DBApiControllers/saveUserDataDBController')


exports.getProfileData = async (account_id, nickname) => {
try{
  const player_id = account_id;
  const playerName =  nickname;

    if(!playerName || !player_id) {
      throw new Error('Session don`t has Nickname or player_id');
    }
  const profileRequest = querystring.stringify({
    application_id: app_id,
    account_id: player_id,
    extra: 'clan',
    fields: 'clan.tag,role,account_name',
  });

  const statisticsRequest = querystring.stringify({
    application_id: app_id,
    account_id: player_id,
    fields: 'statistics.pvp',
  });

  const profileData = await makeGETRequest('https://api.worldofwarships.eu/wows/clans/accountinfo/?' + profileRequest);
  console.log('данные профиля: ', profileData)  
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

    await saveUserDB.saveOrUpdateUserProfile({body: {playerName, userProfile}});

    console.log(`Профиль пользователя ${playerName} (${player_id}) обновлён в БД.`);

  } catch (error) {
        console.error('Error on getProfileData', error.message);
  }
};





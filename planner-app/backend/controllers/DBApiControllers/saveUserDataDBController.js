const User = require('../../models/UserDBModel');

async function saveOrUpdateUserProfile(req) {
    try {
        const {nickname, userProfile} = req.body;

        const updateUser = await User.findOneAndUpdate(
            {id: userProfile.id},
            {
                $set: { id: userProfile.id,
                    name: userProfile.name,
                    clanTag: userProfile.clanTag,
                    role: userProfile.role,
                    battles: userProfile.battles,
                    wins: userProfile.wins,
                    losses: userProfile.losses,
                    frags: userProfile.frags,
                    survived_battles: userProfile.survived_battles,
                    damage_dealt: userProfile.damage_dealt,
                    max_damage_dealt: userProfile.max_damage_dealt,
                    max_plane_killed: userProfile.max_plane_killed,
                }
            },
        {
            new: true, 
            upsert: true,
        }
    );
    } catch (error) {
        console.error('Error while saving', error);
        throw new Error("Error in saveOrUpdateDB");
        
    }
}

module.exports = { saveOrUpdateUserProfile };
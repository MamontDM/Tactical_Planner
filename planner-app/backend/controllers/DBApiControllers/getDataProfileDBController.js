const User = require('../../models/UserDBModel')

const getUserData = async (req, res) => {
    console.log('from base');
    try {
        const { id } = req.query;
        if(!id){
             return res.status(400).json({error: "Id is required"});
        }
        const userData = await User.findOne({id: id});

        console.log('user data is:', userData);
        return res.json(userData);
    }catch(error){
       return res.status(500).json({error: error.message});
    }

}
module.exports = { getUserData };

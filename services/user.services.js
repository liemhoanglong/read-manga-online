var UserModel = require('../model/user.model');
const bcrypt = require('bcrypt');
const saltRound = 10;

module.exports= {
	getUser:async (id) => {
        const user = await UserModel.findOne({_id: id});
        return user;
    },
    getUserByEmail: async(email)=>{
        const user = await UserModel.findOne({email: email});
        return user;
    },
    createNewUser: async (userInfo)=>{
        const password = bcrypt.hashSync(userInfo.password, saltRound);
        userInfo.password = password;
        console.log("userInfo after hash", userInfo);
        const newUser = await UserModel.create(userInfo);
        console.log("newUser", newUser);
        return newUser;
    }
}



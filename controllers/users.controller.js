const UserService = require('../services/user.services');

module.exports = {
    getUserProfile: (req, res, next)=>{
        res.render('profile');
    },
    getLoginPage: (req, res, next)=>{
        const message =  req.flash();
        console.log("error", message.error);
        res.render('login', {error: message.error});
    },
    login: (req, res, next)=>{
        
    },
    logout: (req, res, next)=>{

    },
    register: (req, res, next)=>{
    },
    getRegisterPage: (req, res, next)=>{
        
        const message =  req.flash();
        console.log("error", message.error);
        res.render('register', {error: message.error});
    },
    createNewUser:async (req, res, next)=>{
        const rawUser = req.body;
        console.log(rawUser);
        if(rawUser.password === rawUser.retype_password){
            const userData = {};
            userData.email = rawUser.email;
            userData.password = rawUser.password;
            userData.fullName = rawUser.fullName;
            console.log("userData",userData);
            const userRes = await UserService.createNewUser(userData);
            console.log("userRes", userRes);
            if(userRes){
                res.send("Đã đăng ký thành công\nVui lòng <a href='/users/login'>Đăng nhập</a>");
            }
            else{
                res.send("something when wrong!");
            }
        }else{
            req.flash('error', 'Mật khẩu nhập lại không đúng');
            res.redirect('/users/register');
        }
    }
}

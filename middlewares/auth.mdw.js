module.exports = {
    authLogin:async (req, res, next)=>{

        if (req.isAuthenticated()){
            res.locals.user =await req.user;
            console.log("auth sucess");
            return next();
        }
        console.log("what");
        req.flash('error_msg', 'Please log in');
        res.redirect('/users/login');
    },
    authNotLogin: (req, res, next)=>{
        if(!req.isAuthenticated()){
            return next();
        }
        res.redirect('/');
    },
    logged: async (req, res, next)=>{
        if (req.isAuthenticated()){
            res.locals.user =await req.user;
        }
        next();
    }
}
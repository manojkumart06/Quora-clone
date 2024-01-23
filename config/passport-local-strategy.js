const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

console.log("Local strategy running");

passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
    async function(req,email,password,done){
        try{
            const user=await User.findOne({email:email});
            console.log(user);
            if(!user || user.password!=password){
                console.log('Invalid user name or password');
                return done(null,false);
            }
            
            return done(null,user);

        }catch(err){
            console.log('error',err);
            return done(err);
        }
    }

));

passport.serializeUser(function(user,done){
    console.log('********serilizing*******');
    return done(null,user.id);
});



passport.deserializeUser(async function(id,done){
 //   console.log('*********deserilizing******');
    try{
        const user=await User.findById(id);
        return done(null,user);
    }catch(err){
        console.log('error in finding user ---> Passport');
        return done(err);
    }
})

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;

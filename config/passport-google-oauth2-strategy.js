const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
const env=require('./environment');

console.log('google auth running');

passport.use(new googleStrategy({

    clientID:env.google_client_id,
    clientSecret:env.google_client_Secret,
    callbackURL:env.google_callbackURL,
},
    async function(accessToken,refreshToken,profile,done){
        try{
            const user=await User.findOne({email:profile.emails[0].value}).exec();
            if(user){
                console.log('profile',profile);
                return done(null,user);
            }
            else{
                const user=await User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                })
                if(user){
                    return done(null,user);
                }
                else{
                    console.log('error in creating user',err);
                    return ;
                }
            }
        }
        catch(err){
            console.log('error in google strategy passport',err);
            return;
        }
    }
))
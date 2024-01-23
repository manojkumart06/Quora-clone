const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/user_controller');

router.get('/profile/:id',passport.checkAuthentication,userController.profile);

router.get('/sign-up',userController.signUp);

router.get('/sign-in',userController.signIn);

router.post('/create',userController.create)

router.post('/update/:id',passport.checkAuthentication,userController.updateUser);

router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/sign-in'}),userController.createSession);

router.get('/sign-out',userController.destroySession);

//we send it to google
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
//this is callback url
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession)

module.exports=router;
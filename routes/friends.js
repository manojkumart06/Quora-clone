const express=require('express');
const router=express.Router();
const passport=require('passport');


const friendsController=require('../controllers/friendship_controller');

router.post('/create-friend',passport.checkAuthentication,friendsController.createFriendship);

module.exports=router;
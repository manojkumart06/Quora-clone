const express=require('express');
const router=express.Router();
const passport=require('passport');


const likeController=require('../controllers/like_controller');

router.post('/create-post-like',passport.checkAuthentication,likeController.createLikePost);

router.post('/create-answer-like',passport.checkAuthentication,likeController.createLikeAnswer);

router.post('/create-comment-like',passport.checkAuthentication,likeController.createLikeComment);

module.exports=router;
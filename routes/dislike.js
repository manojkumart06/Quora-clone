const express=require('express');
const router=express.Router();
const passport=require('passport');


const disLikeController=require('../controllers/disLike_controller');

router.post('/create-post-dislike',passport.checkAuthentication,disLikeController.createDisLikePost);

router.post('/create-answer-dislike',passport.checkAuthentication,disLikeController.createDisLikeAnswer);


module.exports=router;

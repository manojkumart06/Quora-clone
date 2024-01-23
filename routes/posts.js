const express=require('express');
const router=express.Router();
const passport=require('passport');


const postController=require('../controllers/post_controller');

router.post('/create',passport.checkAuthentication,postController.createPost);

router.post('/create-user-profile',passport.checkAuthentication,postController.createProfileUser);

router.get('/delete/:id',passport.checkAuthentication,postController.destroyPost);

module.exports=router;
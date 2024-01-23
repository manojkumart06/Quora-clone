const express=require('express');
const router=express.Router();

const homeController=require('../controllers/home_controller');

router.get('/',homeController.home);

router.use('/users',require('./users'));

router.use('/posts',require('./posts'));

router.use('/answers',require('./answers'));

router.use('/comments',require('./comments'))

router.use('/likes',require('./likes'));

router.use('/dislikes',require('./dislike'));

router.use('/friend',require('./friends'));


module.exports=router;


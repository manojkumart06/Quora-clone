const express=require('express');
const router=express.Router();
const passport=require('passport');


const answerController=require('../controllers/answer_controller');

router.post('/create',passport.checkAuthentication,answerController.createAnswer);

router.get('/delete/:id',passport.checkAuthentication,answerController.detroyAnswer);

module.exports=router;
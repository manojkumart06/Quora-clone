const User=require('../models/user');
const Post=require('../models/post');
const Comment=require('../models/comments');
const Answer=require('../models/answer');


module.exports.home=async function(req,res){

    try{
        
        const postList=await Post.find({}).sort('-createdAt').populate('user').populate({
            path:'answers',
            populate:({
            path:'comments',
            populate:{
            path:'user'
            }})}).populate({
                path:'answers',
                populate:{
                    path:'user'
                }
            }).exec()
        if(req.user){
            const userSendingReq=await User.findById({_id:req.user._id}).populate('friendships').exec();
            //now to req.user will have the populated friendships
            req.user=userSendingReq;
        }
       // console.log('all user:',postList);
        const users=await User.find({});
        return res.render('home',{
            title:'Quora',
            all_post:postList,
            all_users:users,
            sendReq:req.user,
        
        });
    }catch(err){
        console.log('error in displaying users',err);
        return res.redirect('back');
    }
};
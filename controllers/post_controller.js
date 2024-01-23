const Post=require('../models/post');
const Answer=require('../models/answer');
const Comment=require('../models/comments');
const Like=require('../models/like');
const Dislike=require('../models/dislike');

module.exports.createPost=async function(req,res){
   try{
    const post=await Post.create({
        content:req.body.content,
        user:req.user._id
    })
    console.log('post created');
    return res.redirect('back');
   }catch(err){
    
    return res.redirect('back');
   } 
}
module.exports.createProfileUser=async function(req,res){
    try{
        const post=await Post.create({
            content:req.body.content,
            user:req.user._id,
            user_profile:req.body.profile_user
        })
        req.flash('success','post created')
        return res.redirect('back');
    }catch(err){
        console.log('error:',err);
        return res.redirect('back');
    }
}

module.exports.destroyPost=async function(req,res){
    try{
        const post=await Post.findById(req.params.id);
        console.log(post);
        if(post.user.toString()==req.user.id){
            post.deleteOne();
            console.log('post deleted');
            const allAnswers=await Answer.find({post:req.params.id});

            const allComments=await Comment.find({post:req.params.id});
            for(let comment of allComments){
                await Like.deleteMany({likeable:comment._id});
            }
            console.log('likes associated with comments deleted');

        
            for(let answer of allAnswers){
                await Comment.deleteMany({answer:answer._id});
                await Like.deleteMany({likeable:answer._id});
                await Dislike.deleteMany({disLikeable:answer._id});
            }

           
            await Answer.deleteMany({post:req.params.id});
            console.log('Answer associated with post deleted');

            await Like.deleteMany({likeable:post._id});
            console.log('Likes associated with post deleted');

            await Dislike.deleteMany({disLikeable:post._id})
            console.log('DisLikes associated with post deleted');

            return res.redirect('back');
        }else{
            console.log('sign-in first');
            return res.redirect('back');
        }
    }catch(err){
        console.log('error',err);
        return res.redirect('back');
    }
}
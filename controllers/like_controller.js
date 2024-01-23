const User=require('../models/user');
const Post=require('../models/post');
const Like=require('../models/like');
const Dislike=require('../models/dislike');
const Answer=require('../models/answer');
const Comment=require('../models/comments');


module.exports.createLikePost=async function(req,res){
    try{
        if(req.user){
            const post=await Post.findById(req.body.post);
            const disLikeUser=await Dislike.find({user:req.user._id});

            let obj=disLikeUser.find(o => o.disLikeable.toString()==post.id);
        //    console.log('dislike obj:',obj);
            if(obj){
                
                    const pullDisLike=await Post.findByIdAndUpdate(obj.disLikeable,{$pull:{disLikes:obj._id}});
                    const disLike=await Dislike.findByIdAndDelete(obj._id);

                    const like=await Like.create({
                        user:req.user._id,
                        likeable:req.body.post,
                        onModel:'Post' 
                    })
                    post.likes.push(like);
                    post.save();
                    return res.redirect('back');
            }
            else{
                const likeUser=await Like.find({user:req.user._id});
                let obj=likeUser.find(o => o.likeable.toString()==post.id);
             //   console.log('like obj:',obj);
                if(obj){
                    const pullLike=await Post.findByIdAndUpdate(obj.likeable,{$pull:{likes:obj._id}});
                    const like=await Like.findByIdAndDelete(obj._id);
                    return res.redirect('back');
                }
                else{
                const like=await Like.create({
                    user:req.user._id,
                    likeable:req.body.post,
                    onModel:'Post'
                })
                    post.likes.push(like);
                    post.save();
                    return res.redirect('back');
                }
            }
        }
    }catch(err){
        console.log('error in liking a post',err);
        return res.redirect('back');
    }
}


module.exports.createLikeAnswer=async function(req,res){
    try{
        if(req.user){
            const answer=await Answer.findById(req.body.answer);
            const disLikeUser=await Dislike.find({user:req.user._id});

            let obj=disLikeUser.find(o => o.disLikeable.toString()==answer.id);
        //    console.log('dislike obj:',obj);
            if(obj){
                
                    const pullDisLike=await Answer.findByIdAndUpdate(obj.disLikeable,{$pull:{disLikes:obj._id}});
                    const disLike=await Dislike.findByIdAndDelete(obj._id);

                    const like=await Like.create({
                        user:req.user._id,
                        likeable:req.body.answer,
                        onModel:'Answer' 
                    })
                    answer.likes.push(like);
                    answer.save();
                    return res.redirect('back');
            }
            else{
                const likeUser=await Like.find({user:req.user._id});
                let obj=likeUser.find(o => o.likeable.toString()==answer.id);
             //   console.log('like obj:',obj);
                if(obj){
                    const pullLike=await Answer.findByIdAndUpdate(obj.likeable,{$pull:{likes:obj._id}});
                    const like=await Like.findByIdAndDelete(obj._id);
                    return res.redirect('back');
                }
                else{
                const like=await Like.create({
                    user:req.user._id,
                    likeable:req.body.answer,
                    onModel:'Answer'
                })
                    answer.likes.push(like);
                    answer.save();
                    return res.redirect('back');
                }
            }
        }
    }catch(err){
        console.log('error in liking a answer',err);
        return res.redirect('back');
    }
}



module.exports.createLikeComment = async function(req,res){
    try{
        
        if(req.user){
            const comment=await Comment.findById(req.body.comment);
    
         //   console.log('comments:',comment);
            const likeUser=await Like.find({user:req.user._id});
            let obj = likeUser.find(o => o.likeable.toString() === comment.id);
            
            
            if(obj){
                try{
                    //It will delete the like from the likes array in comment
                    const pullLike=await Comment.findByIdAndUpdate(obj.likeable,{$pull:{likes:obj._id}});
                    //Will delete like from the like schema.
                    const like=await Like.findByIdAndDelete(obj._id)
                    req.flash('success','Like Removed');
                    return res.redirect('back');
                }catch(err){
                    console.log('error:',err);
                    return res.redirect('back');
                }
                
            }else{
                const like=await Like.create({
                    user:req.user._id,
                    likeable:req.body.comment,
                    onModel:'Comment'
            })
            comment.likes.push(like)
            comment.save();
            req.flash('success','Comment Liked');
            return res.redirect('back');
        }
        
    }
    }catch(err){
      //  req.flash('error');
      console.log('error in liking comment:',err);
        return res.redirect('back');
    }
}
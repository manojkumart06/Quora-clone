const User=require('../models/user');
const Post=require('../models/post');
const Like=require('../models/like');
const Dislike=require('../models/dislike');
const Answer=require('../models/answer');




module.exports.createDisLikePost=async function(req,res){
    try{
        if(req.user){
            const post=await Post.findById(req.body.post);
            const likeUser=await Like.find({user:req.user._id});

            let obj=likeUser.find(o => o.likeable.toString()==post.id);
          //  console.log('like obj:',obj);
            if(obj){
                    const pullLike=await Post.findByIdAndUpdate(obj.likeable,{$pull:{likes:obj._id}});
                    const like=await Like.findByIdAndDelete(obj._id);

                    const disLike=await Dislike.create({
                        user:req.user._id,
                        disLikeable:req.body.post,
                        onModel:'Post' 
                    })
                    post.disLikes.push(disLike);
                    post.save();
                    return res.redirect('back');
                }
                else{
                    const disLikeUser=await Dislike.find({user:req.user._id});
                    let obj=disLikeUser.find(o => o.disLikeable.toString()==post.id);
                //    console.log('dislike obj:',obj);
                    if(obj){
                        const pullDisLike=await Post.findByIdAndUpdate(obj.disLikeable,{$pull:{disLikes:obj._id}});
                        const disLike=await Dislike.findByIdAndDelete(obj._id);
                        return res.redirect('back');
                    }
                    else{
                        const disLike=await Dislike.create({
                            user:req.user._id,
                            disLikeable:req.body.post,
                            onModel:'Post'
                        })
                        post.disLikes.push(disLike);
                        post.save();
                        return res.redirect('back');
                    }
                }
                
            }
        }
    catch(err){
        console.log('error in disliking a post')
    }
}


module.exports.createDisLikeAnswer=async function(req,res){
    try{
        if(req.user){
            const answer=await Answer.findById(req.body.answer);
            const likeUser=await Like.find({user:req.user._id});

            let obj=likeUser.find(o => o.likeable.toString()==answer.id);
          //  console.log('like obj:',obj);
            if(obj){
                    const pullLike=await Answer.findByIdAndUpdate(obj.likeable,{$pull:{likes:obj._id}});
                    const like=await Like.findByIdAndDelete(obj._id);

                    const disLike=await Dislike.create({
                        user:req.user._id,
                        disLikeable:req.body.answer,
                        onModel:'Answer' 
                    })
                    answer.disLikes.push(disLike);
                    answer.save();
                    return res.redirect('back');
                }
                else{
                    const disLikeUser=await Dislike.find({user:req.user._id});
                    let obj=disLikeUser.find(o => o.disLikeable.toString()==answer.id);
                //    console.log('dislike obj:',obj);
                    if(obj){
                        const pullDisLike=await Answer.findByIdAndUpdate(obj.disLikeable,{$pull:{disLikes:obj._id}});
                        const disLike=await Dislike.findByIdAndDelete(obj._id);
                        return res.redirect('back');
                    }
                    else{
                        const disLike=await Dislike.create({
                            user:req.user._id,
                            disLikeable:req.body.answer,
                            onModel:'Answer'
                        })
                        answer.disLikes.push(disLike);
                        answer.save();
                        return res.redirect('back');
                    }
                }
                
            }
        }
    catch(err){
        console.log('error in disliking a answer',err);
    }
}

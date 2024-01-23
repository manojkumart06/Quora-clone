const Post=require('../models/post');
const Answer=require('../models/answer');
const Comment=require('../models/comments');
const Like=require('../models/like');



module.exports.create=async function(req,res){
    try{
        const answer=await Answer.findById(req.body.answer);
        if(answer){
                let comment=await Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post,
                answer:req.body.answer
                });
                //It will push the comment in post(comment array)
                answer.comments.push(comment);
                //whenever update is done then we need to save the final result.
                answer.save();
              //  req.flash('success','Answer Created');
             //   answer=await comment.populate('user','name email');
                //call comments mailer 
             //   commentsMailer.newComment(comment);
                console.log("comment created");
                return res.redirect('/');


            }
                
          //  req.flash('error','Sign-in first');
            return res.redirect('back');
    
            
        }
        
    catch(err){
      //  req.flash('error',err);
      console.log('error in commenting:',err);
        res.redirect('/');
    }
}


module.exports.destroyComment=async function(req,res){
    try{
        
        const comment=await Comment.findById(req.params.id);
        if(comment.user.toString()==req.user.id){
            let answerId=comment.answer;
            await Like.deleteMany({likeable:comment._id});
            comment.deleteOne();

            const deleteComment=await Answer.findByIdAndUpdate(answerId,{$pull:{comments:req.params.id}});
            console.log('comment deleted');
            return res.redirect('back');
        }else{
            console.log('error');
            return res.redirect('back');
        }
    }catch(err){
        console.log('error',err);
        return res.redirect('back');
    }
}
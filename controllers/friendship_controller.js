const User=require('../models/user');
const Friendship=require('../models/friendships');

module.exports.createFriendship=async function(req,res){

    try{
    //user who will receive the friend req.
    const receiveFriendReq=await User.findById(req.body.userId);

    //user who will send the req.
    const sendFriendReq=await User.findById(req.user._id).populate('friendships').exec();
   
    //will get all the friends whom req is send by user.
    const allFriends=await Friendship.find({from_user:req.user._id});

    //check if the receiver user is present in friendship array in sender user.
    let checkUser = allFriends.find(o => o.to_user.toString() === receiveFriendReq.id);
    

    if(checkUser){
        try{
        //it will pull the receiver id from the friendship array in user.
        const pullUser=await User.findByIdAndUpdate(sendFriendReq._id,{$pull:{friendships:checkUser.to_user}});

        //Will delete friendship from the Friendship schema.
        const friendDeleted=await Friendship.findByIdAndDelete(checkUser._id);

      //  req.flash('success','User Removed');
        return res.redirect('back');
        }catch(err){
            console.log('error',err);
            return res.redirect('back');
        }
        
    }
    else{
        const friends=await Friendship.create({
            from_user:req.user._id,
            to_user:receiveFriendReq._id
        })

        //sendFriendReq.friendships.push(friends._id);
        
        sendFriendReq.friendships.push(friends.to_user);
        sendFriendReq.save();
    //    req.flash('success','User Added');
        console.log('friend Added');
        return res.redirect('back');
        
        }
    }

catch(err){
 //   req.flash('error',err);
    return res.redirect('back');
    }
}

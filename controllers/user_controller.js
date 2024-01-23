const User=require('../models/user');
const fs=require('fs');
const path=require('path');

const Post=require('../models/post');
const Comment=require('../models/comments');
const Answer=require('../models/answer');
const commentsMailer=require('../mailers/verifications_mailers');


module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:'Quora'
    })
}
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:'Quora'
    })
}

module.exports.create=async function(req,res){
    if(req.body.password != req.body.confirm_password){
        console.log('not matching')
        return res.redirect('back');
    }
    try{
        const user=await User.findOne({email:req.body.email});
        if(!user){
            const user=await User.create(req.body);
            console.log('user created');
            commentsMailer.newUser(user);
            return res.redirect('/users/sign-in');
        
        }else{
            console.log('Already have an accound....please sign-in');
            return res.redirect('/users/sign-in');
        }

    }catch(err){
        console.log("error in signing up",err);
        return res.redirect('back');

    }
}

module.exports.createSession=async function(req,res){
    req.flash('success','logged in successfuly')
    console.log('logged in successfuly');
    return res.redirect('/');
} 


module.exports.profile=async function(req,res){
 try{
    const postList=await Post.find({user_profile:req.params.id}).sort('-createdAt').populate('user').populate({
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
    
    const user=await User.findById(req.params.id);
    return res.render('user_profile',{
        title:'Quora',
        allPost:postList,
        profile_user:user
    })
}
catch(err){
    console.log('error:',err);
    req.flash('error',err);
    return res.redirect('back');
}
}

module.exports.updateUser=async function(req,res){
    try{
        
        if(req.user.id==req.params.id){
            const user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('*******multer error',err);
                    return res.redirect('back');
                }
                user.name=req.body.name;
                user.email=req.body.email;
             //   console.log('file:',req.file);
                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar=User.avatarPath + '/' + req.file.filename;
                 //   console.log('******user:',user);
                }
                user.save();
                req.flash('success','User details updated');
                return res.redirect('back');
            
            })
        
            
          
        }
    }catch(err){
        req.flash('error','User details cannot be updated');
        return res.redirect('back');
    }
}

module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){return next(err); }
        req.flash('success','logged out successfuly');
        console.log('logging out')
        return res.redirect('/');
    })
}
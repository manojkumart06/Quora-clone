const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    user_profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    answers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Answer'
    }],

    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }],
    disLikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Dislike'
    }]

},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);

module.exports=Post;
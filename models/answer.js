const mongoose=require('mongoose');

const answerSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }],
    disLikes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Dislike'
        }
    ]
    
    
},{
    timestamps:true
});

const Answer=mongoose.model('Answer',answerSchema);

module.exports=Answer;
const mongoose=require('mongoose');

const disLikeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
    },
    disLikeable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    onModel:{
        type:String,
        required:true,
        enum:['Post','Answer']
    }
},{
    timestamps:true
});

const Dislike=mongoose.model('Dislike',disLikeSchema);

module.exports=Dislike;
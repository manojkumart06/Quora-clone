const mongoose=require('mongoose');
const env=require('./environment');
require("dotenv").config();


//mongoose.connect(process.env.MONGODB);
mongoose.connect(`mongodb://localhost/${env.db}`);

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error in connecting to MongoDB"));

db.once('open',function(){
    console.log('connected to Database::MongoDB');

})

module.exports=db;
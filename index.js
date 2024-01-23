const express=require('express');
const env=require('./config/environment');
const logger=require('morgan');
const cookieParser=require('cookie-parser');
const app=express();
const port=9000;
require("dotenv").config();
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const flash=require('connect-flash');
const customMware=require('./config/middleware');

//setup the chat server to be used with socket.io
const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat server is running on port 5000');


//app.use(express.urlencoded());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(express.static(env.assest_path));

app.use(expressLayouts);

//extract style and scripts from sub pages into the layout.
//app.set('layout extractStyles',true);
//app.set('layout extractScripts',true);



app.set('view engine','ejs');
app.set('views','./views')

app.use(session({
    store:MongoStore.create({
        //mongoUrl:process.env.MONGODB,
        mongoUrl:'mongodb://localhost:27017',
        autoRemove:'disabled'
    },
    async function(err){
        try{
            console.log('connect-mongo status ok');
        }catch(err){
            console.log('err',err);
        }
    }),
    name:'Quora',
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{maxAge:(1000 * 60 * 100)}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){console.log(`Error in running server:${err}`)};
    console.log(`Server running on port:${port}`);
})
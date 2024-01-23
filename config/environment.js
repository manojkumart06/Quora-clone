const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream=rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});

const development={
    name:'development',
    assest_path:'./assests',
    session_cookie_key:'Something',
    db:'Quora_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'manoj123@gmail.com',
            pass:'mekkybjjnmqtjuyg'
        }
    },
    google_client_id:'567797715971-bfjpigiqiptp23q2eugrecg8p2nahiji.apps.googleusercontent.com',
    google_client_Secret:'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',
    google_callbackURL:'http://localhost:9000/users/auth/google/callback',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}

const production={
    name:process.env.QUORA_ENVIRONMENT,
    assest_path:process.env.QUORA_ASSEST_PATH,
    session_cookie_key:process.env.QUORA_SESSION_COOKIE,
    db:process.env.QUORA_DB,
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.QUORA_GMAIL_USERNAME,
            pass:process.env.QUORA_GMAIL_PASSWORD
        }
    },
    google_client_id:process.env.QUORA_GOOGLE_CLIENT_ID,
    google_client_Secret:process.env.QUORA_GOOGLE_CLIENT_SECRET,
    google_callbackURL:process.env.QUORA_GOOGLE_CALLBACK_URL,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}

module.exports=eval(process.env.QUORA_ENVIRONMENT) == undefined ? development : eval(provess.env.QUORA_ENVIRONMENT);

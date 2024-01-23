const nodeMailer=require('../config/nodemailer');


//this function will be called whenever any new user is created.
exports.newUser=async function(user){
    try{
        //
        let htmlString=nodeMailer.renderTemplate({user:user},'/user_verification/user_verification.ejs');
        const info=await nodeMailer.transporter.sendMail({
            from:'sdevesh227@gmail.com',
            to:user.email,
            subject:"New Acoount created on Quora",
            html:htmlString
        });
        if(info){
            console.log('message sent');
            return;
        }else{
            console.log('error in sending mail',err);
            return;
        }
    }catch(err){
        console.log('error in sending mail',err);
        return;
    }
}
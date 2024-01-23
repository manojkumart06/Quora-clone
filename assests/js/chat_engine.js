//this will send req for connection from client side.
console.log('running');
class ChatEngine{
    
    constructor(chatBoxId,userEmail){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        

        //io is a global variable given bt socket.io cdn
        //It emit the connect event.//we are not using emit because it will automatically emit.
        this.socket=io.connect('http://localhost:5000',{ transports : ['websocket']});

        if(this.userEmail){
            
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self=this;

        this.socket.on('connect',function(){
            console.log('connection established using sockets.....!');

            //from client side it will emit this request and will catch on server side.
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'Quora'

            });

            self.socket.on('user_joined',function(data){
                console.log('A user has joined',data);
            });
        })

        //send message on clicking the send message button.
        $('#send-message').click(function(){
            let msg=$('#chat-message-input').val();
            console.log('msg:',msg);

            if(msg !=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'Quora'
                });
            }
        });

        
            self.socket.on('receive_message', function(data){
                console.log('message received', data.message);
    
    
                let newMessage = $('<li>');
    
                let messageType = 'other-message';
    
                if (data.user_email == self.userEmail){
                    messageType = 'self-message';
                }
    
                newMessage.append($('<span>', {
                    'html': data.message
                }));
    
                newMessage.append($('<sub>', {
                    'html': data.user_email
                }));
    
                newMessage.addClass(messageType);
    
                $('#chat-messages-list').append(newMessage);
 
        })
    }
}
module.exports.chatSockets=function(socketServer){
    //io will have all the sockets.
    let io=require('socket.io')(socketServer);

    //it will receive this connection and emit that the connection is established and connection handler will detects it on server side.
    io.sockets.on('connection',function(socket){
        console.log('new connection received',socket.id);

        socket.on('disconnect',function(){
            console.log('socket disconnected');
        });
        //just like event handler it will catch the request from client side.
        socket.on('join_room',function(data){
            console.log('joining request received.',data)

            //it will join this chatroom if exist or create if not exist.
            socket.join(data.chatroom)

            //emit this inside the chatroom telling other user that someone has joined.
            io.in(data.chatroom).emit('user_joined',data);
        });
        //detect send_message and broadcast to everyone in the room.
        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        });

    });
}
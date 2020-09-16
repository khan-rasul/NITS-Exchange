var server = require("socket.io");
var Chat = require("./models/chat");
var onlineUsers = new Map();
function serverSocket(http){
   var io = new server(http);
   io.on('connection', function(socket) {
      var userId;
         console.log('A user connected');
         socket.on("new-user", function(data){
            userId = data.id;
            onlineUsers.set(data.id, socket.id);
         });

         socket.on("private-message" , function(data){
            var chatId = (data.sender < data.receiver ? data.sender + data.receiver : data.receiver + data.sender);
            Chat.findById(chatId , function(err , chat){
               if(err){
                  console.log(err);
               }
               else{
                  chat.messages.push({receiver : data.receiver , content : data.content});
                  chat.save();
                  if(onlineUsers.has(data.receiver)){
                     io.to(onlineUsers.get(data.receiver)).emit(chatId, data.content);
                  }
               }
           });
         })
         socket.on('disconnect', function () {
            onlineUsers.delete(userId);
            console.log('A user disconnected');
         });
      });
}
module.exports = serverSocket;
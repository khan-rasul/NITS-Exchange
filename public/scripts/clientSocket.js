var socket = io();
var sender = $("#users").data("sender");
var receiver = $("#users").data("receiver");
var chatId = (sender < receiver ? sender + receiver : receiver + sender);
socket.emit("new-user", {id : sender});
$("#send").submit(function(e){
    e.preventDefault();
    var message = $("input[name = message]").val();
    $("input[name = message]").val('');
    $("#messages").append('<div class = "text-right" ><li class="chat-padding btn btn-lg btn-dark btn-padding">' + message + '</li></div>');
    socket.emit("private-message" , {sender : sender , receiver: receiver , content: message});
});
socket.on(chatId, function(message){
    $("#messages").append('<div class = "text-left" ><li class="chat-padding btn btn-lg btn-outline-dark btn-padding">' + message + '</li></div>');
});
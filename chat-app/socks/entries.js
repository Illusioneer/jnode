exports.entryping = function(data){
    console.log("User: " + data.uid + " : " + data.msg + data.chat);
    socket.broadcast.to(data.chat).emit("pong",{uid:"MCP", msg: data.uid + " has logged in."});
};
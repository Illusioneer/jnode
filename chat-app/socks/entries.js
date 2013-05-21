exports.entryping = function(data){
    console.log("User: " + data.uid + " has deleted ID " + data.statid);
    socket.broadcast.to(data.chat).emit("entrypong",{uid: data.uid, statid: data.statid});
}
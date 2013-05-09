information = {



}

module.exports = messages = {

    version: ".0.0.1",

    description: "Handler object for all incoming socket connections."

    messages: {

        "disconnect": function (data) {
            console.log("Disconnected: " + socket.username);
            users.splice(users.indexOf(socket.username),1);
            socket.broadcast.to('main').emit("pong",{uid:"MCP", msg:socket.username + " has disconnected." });
            console.log("Current users: " + users);
        },
        "userlogin": function (data) {
            users.push(data.uid);
            console.log("User: " + data.uid + " : " + data.msg + data.chat);
            socket.broadcast.to(data.chat).emit("pong",{uid:data.uid, msg:data.msg,list:users});
            socket.join(data.chat);
            socket.username = data.uid;
            console.log("Current users: " + users);
        }
    }


}
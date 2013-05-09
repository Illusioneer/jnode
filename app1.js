var express = require('express');
var app = express();
var socket = require('socket.io');

var pg = require('pg');
var client = new pg.Client('postgres://master1:harper123@localhost:5432/mastercontrol');
client.connect();


app.configure(function(){
    app.use(express.static(__dirname + '/'));
});

var server = app.listen(9090);
var io = socket.listen(server);

io.sockets.on('connection', function (socket) {

    socket.on('disconnect', function (socket) {
        console.log("disconnect");
    });

    socket.emit("pong",{txt:"Connected to server"});
    socket.on('ping', function (data) {
        console.log("Logging: " + data.uid + " : " + data.msg);
        socket.broadcast.to(data.chat).emit("pong",{txt:data.uid + " : " +data.msg});
    });
    socket.on('login', function (data) {
        console.log("User: " + data.uid + " : " + data.msg + data.chat);
        socket.broadcast.to(data.chat).emit("pong",{txt:data.uid + " : " +data.msg  + data.chat});
        socket.join(data.chat);
    });
    socket.on('updatestats', function (data) {
//	var pg = require('pg');
//	var client = new pg.Client('postgres://master1:harper123@localhost:5432/mastercontrol');
//	client.connect();

        var query = client.query("SELECT COUNT(*) FROM servicestatuses;");
        console.log("Update sent" + data.stat);
        query.on('row', function(row) {
            socket.broadcast.to('main').emit("statupdate",{txt:row.count});
            console.log(row);
        });
    });

});
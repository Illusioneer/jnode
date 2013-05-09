var express = require('express');
var app = express();
var socket = require('socket.io');
var moment = require('moment');
var pg = require('pg');
var client = new pg.Client('postgres://master1:harper123@localhost:5432/mastercontrol');
client.connect();


app.configure(function(){
    app.use(express.static(__dirname + '/'));
});

var server = app.listen(9090);
var io = socket.listen(server);
var users = new Array();
var socketcall = String();

io.sockets.on('connection', function (socket) {
    for (item in socket.in){console.log("EVENT HERE:" +item);}
    socket.emit("pong",{uid:"MCP", msg:"Time to get connected." });
    socketcall = 'ping';
    socket.on(socketcall, function (data){
        console.log("SOCKET:"+socketcall);
        console.time(socketcall)
        console.log("LOGGING: " + data)
        socket.broadcast.to((typeof data.chat === 'undefined') ? 'main' : data.chat).emit(socketcall,{uid:data.uid, msg:data.msg, list: users});
        console.timeEnd(socketcall)
    })

    socket.on('updatestats', function (data) {
        console.time('sqlperftest')
        var starttime = moment().subtract('minutes', 5).format('YYYY-MM-DD h:mm');
        var nowtime =  moment().format('YYYY-MM-DD h:mm');
        var thesql = "SELECT * FROM servicestatuses WHERE nagiostimeid >= '" + starttime + "' AND nagiostimeid < '" + nowtime + "' AND current_state >= 1 AND current_state < 8"
        var query = client.query(thesql);
        query.on('row', function(row) {
            var response = JSON.parse("{" + row.servicedata.replace(/\=\>/g,":").replace(/NULL/g,'"NULL"') + "}")
            socket.broadcast.to('main').emit("statupdate",{stats:response});
        });
        console.timeEnd('sqlperftest')
    });

});

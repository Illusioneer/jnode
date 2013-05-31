var express = require('express'),
    socket = require('socket.io'),
    moment = require('moment'),
    pg = require('pg'),
    client = new pg.Client('postgres://master1:harper123@localhost:5432/mastercontrol'),
    StatsD = require('node-statsd').StatsD;
client.connect();

stats = new StatsD({host:'dropbox.hcpprod.com'});

var app = express();
app.configure(function(){
    app.use(express.static(__dirname + '/'));
});

var server = app.listen(9090);
var io = socket.listen(server);

io.sockets.on('connection', function (socket) {

    socket.on('disconnect', function (socket) {
        console.log("disconnect");
    });

    socket.emit("pong",{uid:"MCP",msg:"Connected to server"});
    socket.on('ping', function (data) {
        console.log("Logging: " + data.uid + " : " + data.msg);
        socket.broadcast.to('main').emit("pong",{uid:data.uid, msg:data.msg});
    });
    socket.on('login', function (data) {
        console.log("User: " + data.uid + " : " + data.msg + data.chat);
        socket.broadcast.to(data.chat).emit("pong",{uid:"MCP", msg: data.uid + " has logged in."});
        socket.join(data.chat);
    });

    socket.on('entryping', function (data) {
        console.log("User: " + data.uid + " has deleted ID " + data.statid);
        socket.broadcast.to(data.chat).emit("entrypong",{uid: data.uid, statid: data.statid});
    });

    socket.on('updatestats', function (data) {
        var timeOn = new Date().getTime();
        console.time('sqlperftest')
        var starttime = moment().subtract('minutes', 5).format('YYYY-MM-DD h:mm');
        var nowtime =  moment().format('YYYY-MM-DD h:mm');
        var thesql = "SELECT * FROM servicestatuses WHERE nagiostimeid >= '" + starttime + "' AND nagiostimeid < '" + nowtime + "' AND current_state >= 1 AND current_state < 8";
        client.query(thesql, function(err, result){
            stats.timing('current_alerts', result.rows.length);
            for (row in result.rows){
              var response = JSON.parse("{" + result.rows[row].servicedata.replace(/\=\>/g,":").replace(/NULL/g,'"NULL"') + "}");
              socket.broadcast.to('main').emit("statupdate",{stats:response});
            }
        });

        var timeOff = new Date().getTime();
        var timeDiff = timeOff-timeOn
        stats.timing('query_response_time', timeDiff);
        console.log("Processing Time Needed: " + timeDiff + "ms");
    });

});
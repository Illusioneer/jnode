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
        var timeOn = new Date().getTime();
        console.time('sqlperftest')
        var starttime = moment().subtract('minutes', 5).format('YYYY-MM-DD h:mm');
        var nowtime =  moment().format('YYYY-MM-DD h:mm');
        var thesql = "SELECT * FROM servicestatuses WHERE nagiostimeid >= '" + starttime + "' AND nagiostimeid < '" + nowtime + "' AND current_state >= 1 AND current_state < 8"
        var query = client.query(thesql);
        query.on('row', function(row) {
            var response = JSON.parse("{" + row.servicedata.replace(/\=\>/g,":").replace(/NULL/g,'"NULL"') + "}")
            socket.broadcast.to('main').emit("statupdate",{stats:response});
        });
        var timeOff = new Date().getTime();
        stats.timing('query_response_time', timeOn-timeOff);
    });

});
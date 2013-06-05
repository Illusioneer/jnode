var moment = require('moment');
var pg = require('pg');
var client = new pg.Client('postgres://master1:harper123@localhost:5432/mastercontrol');
client.connect();

exports.index = function(req, res){
    var starttime = moment().subtract('minutes', 5).format('YYYY-MM-DD h:mm');
    var nowtime =  moment().format('YYYY-MM-DD h:mm');
    var thesql = "SELECT * FROM servicestatuses WHERE nagiostimeid >= '" + starttime + "' AND nagiostimeid < '" + nowtime + "' AND current_state >= 1 AND current_state < 8";

    client.query(thesql, function(err, result) {
        res.render('user', { title: 'Entry List', posts: result, layout: true });
    });
};

exports.node = function(req, res){
    var starttime = moment().subtract('minutes', 5).format('YYYY-MM-DD h:mm');
    var nowtime =  moment().format('YYYY-MM-DD h:mm');
    var thesql = "SELECT * FROM servicestatuses WHERE nagiostimeid >= '" + starttime + "' AND nagiostimeid < '" + nowtime + "' AND current_state >= 1 AND current_state < 8";

    client.query(thesql, function(err, result) {
        res.render('node', {title: 'node List', datum: result, layout: true});
    });
};
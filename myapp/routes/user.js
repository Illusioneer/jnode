var moment = require('moment');
var pg = require('pg');
var client = new pg.Client('postgres://master1:harper123@localhost:5432/mastercontrol');
client.connect();

exports.list = function(req, res){
  res.render('user', { title: 'User List' + req.params.name, layout: true });
};

exports.node = function(req, res){

    attribs = { title: 'node List', datum: req.params, layout: true };

    var starttime = moment().subtract('minutes', minutes).format('YYYY-MM-DD h:mm');
    var nowtime =  moment().format('YYYY-MM-DD h:mm');
    var thesql = "SELECT * FROM servicestatuses WHERE nagiostimeid >= '" + starttime + "' AND nagiostimeid < '" + nowtime + "' AND current_state >= 1 AND current_state < 8";
    rowset = [];
    var query = client.query(thesql);
    query.on('row', function(row) {
        rowset.push(JSON.parse("{" + row.servicedata.replace(/\=\>/g,":").replace(/NULL/g,'"NULL"') + "}"));
    });

    res.render('node', {title: 'node List', datum: rownum, layout: true});
};

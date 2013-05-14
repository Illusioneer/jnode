exports.updatestats = function(minutes, attribs, callback) {

    var moment = require('moment');
    var pg = require('pg');
    var starttime = moment().subtract('minutes', minutes).format('YYYY-MM-DD h:mm');
    var nowtime =  moment().format('YYYY-MM-DD h:mm');
    var conString = "postgres://master1:harper123@localhost:5432/mastercontrol";
    var sqlquery = "SELECT * FROM servicestatuses WHERE nagiostimeid >= '" + starttime + "' AND nagiostimeid < '" + nowtime + "' AND current_state >= 1 AND current_state < 8";
    pg.connect(conString, function(err, client) {
        client.query(sqlquery, function(err, result) {
            console.log("Row count: %d",result.rows.length);  // 1
            console.log("First one is:", result.rows[0]);
            attribs.data = result.rows;
            callback("node",attribs);
        });
    });
    }


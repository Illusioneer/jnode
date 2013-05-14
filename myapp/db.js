exports.updatestats = function(minutes, attribs, callback) {
        var moment = require('moment');
        var pg = require('pg');
        var client = new pg.Client('postgres://master1:harper123@localhost:5432/mastercontrol');
        client.connect();
        var starttime = moment().subtract('minutes', minutes).format('YYYY-MM-DD h:mm');
        var nowtime =  moment().format('YYYY-MM-DD h:mm');
        var thesql = "SELECT * FROM servicestatuses WHERE nagiostimeid >= '" + starttime + "' AND nagiostimeid < '" + nowtime + "' AND current_state >= 1 AND current_state < 8";
        rowset = [];

        var query = client.query(thesql);

        query.on('row', function(row) {rowset.push(JSON.parse("{" + row.servicedata.replace(/\=\>/g,":").replace(/NULL/g,'"NULL"') + "}"));});
        attribs.serv = rowset;
        callback('node', attribs);
    }


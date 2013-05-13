exports.updatestats = function() {
        var moment = require('moment');
        var pg = require('pg');
        var client = new pg.Client('postgres://master1:harper123@localhost:5432/mastercontrol');
        client.connect();
        var starttime = moment().subtract('minutes', 5).format('YYYY-MM-DD h:mm');
        var nowtime =  moment().format('YYYY-MM-DD h:mm');
        var thesql = "SELECT * FROM servicestatuses WHERE nagiostimeid >= '" + starttime + "' AND nagiostimeid < '" + nowtime + "' AND current_state >= 1 AND current_state < 8";
        rowset = [];
        client.query(thesql).on('row', function(row) {rowset.push(JSON.parse("{" + row.servicedata.replace(/\=\>/g,":").replace(/NULL/g,'"NULL"') + "}"));});
        return rowset
    }

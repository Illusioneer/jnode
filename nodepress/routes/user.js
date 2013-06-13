var moment = require('moment');
var pg = require('pg');
var client = new pg.Client('postgres://master1:harper123@localhost:5432/mastercontrol');
client.connect();

exports.list = function(req, res){
    res.render('user', { title: 'User List', layout: true });
};

exports.backbone = function(req, res) {
	res.render('jason', { title: 'Test Backbone Page', layout: true });
}

exports.jason = function(req, res){
    var thesql = "SELECT * FROM nodeposts ORDER BY create_stamp DESC";

    res.contentType('application/json');

    client.query(thesql, function (err, posts){

        if(err)
            res.send('404 Not found', 404);

        else {
            res.send(JSON.stringify(posts.rows))
        }
    });


};


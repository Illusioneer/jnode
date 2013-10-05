var moment = require('moment');
var pglib = require('../lib/pglib')
var pg = require('pg');
var url = require('url');
var client = new pg.Client('postgres://master1:harper123@localhost:5432/mastercontrol');
client.connect();
var email = require('../email');

exports.blarg = function(req, res){
    pglib.getter(req, res);
}

exports.new = function(req, res){
    res.render('newpost', { title: 'Posting' });
};

exports.submit = function(req,res){
    var now = new Date() - 1;
    console.log("POSTING DATA: "+req);
    datum = [now,req.body.post.title, req.body.post.content, req.body.post.desc,0,'localhost', req.body.post.metadata];
    client.query("INSERT INTO nodeposts(create_stamp, post_name, post_content,post_desc,author,host_name,metadata) values(to_timestamp($1), $2, $3, $4, $5, $6,$7)", datum);
    console.log("TITLE: "+datum);

    var maildata = {
        from: "Your Host <root@localhost.com>", // sender address
        to: "Bryan <bryan.owens@harpercollins.com>", // comma separated list of receivers
        subject: "Hello", // Subject line
        text: "Hello world" // plaintext body
    };

    email.send(maildata);

    res.redirect('/');
}

exports.post = function(req, res) {
        var querystring = "WHERE ";
	andy = 0;
        for (param in req.query) {
				var andy = andy + 1;
				if (andy > 0 ) {queryand == " AND "};
                querystring = querystring + queryand + param + " = '"+ req.query[param] + "'"
        };

	var thesql = "SELECT * FROM nodeposts " + querystring + " ORDER BY create_stamp DESC";
	    console.log("QUERY: " + thesql);
	res.contentType('application/json');

	client.query(thesql, function (err, posts){

	    if(err)
		res.send('404 Not found', 404);

	    else {
		res.send(JSON.stringify(posts.rows))
	    }
	});
};
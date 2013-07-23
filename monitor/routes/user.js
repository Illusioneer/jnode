var moment = require('moment');
var pg = require('pg');
//var client = new pg.Client('postgres://master1:harper123@localhost:5432/mastercontrol');
var client = new pg.Client('postgres://bowens:oracle@10.0.0.2:5432/mastercontrol');
client.connect();

/*
 * GET users listing.
 */

exports.list = function(req, res){
    var loggedin = false;
  res.render('index', { title: 'USER', loggedin: false });;
};


exports.login = function(req,res){
    var now = Date.now();
    console.log("USER LOGGING IN");
    var thesql = "SELECT * FROM users WHERE userlogin = '" + req.body.login.userlogin + "' AND userpass = '" + req.body.login.userpass + "';";
    client.query(thesql);
    console.log("QUERY: " + thesql);

    client.query(thesql, function (err, posts){

        if(err)
            res.send('404 Not found', 404);

        else {
            res.send(JSON.stringify(posts.rows));
	    console.log(JSON.stringify(posts.rows));
	    console.log("I Should be showing data here");
        }
    });
    res.redirect('/');
}
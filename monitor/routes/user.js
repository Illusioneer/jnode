//var moment = require('moment');
var pg = require('pg');
var client = new pg.Client('postgres://master1:harper123@localhost:5432/mastercontrol');
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
    var thesql = "SELECT * FROM users WHERE userid = '" + req.body.login.userid + "' AND password = '" + req.body.login.password + "';";
    client.query(thesql);
    console.log("QUERY: " + thesql);

    client.query(thesql, function (err, posts){

        if(err)
            res.send('404 Not found', 404);

        else {
            res.send(JSON.stringify(posts.rows))
        }
    });
    res.redirect('/');
}

var moment = require('moment');
var pg = require('pg');
//var client = new pg.Client('postgres://master1:harper123@localhost:5432/mastercontrol');
var client = new pg.Client('postgres://bowens:oracle@10.0.0.2:5432/mastercontrol');
client.connect();

exports.list = function(req, res){
    var loggedin = false;
  res.render('index', { title: 'USER', loggedin: false });
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
            console.log(JSON.stringify(posts.rows));
            console.log("I Should be showing data here");
            res.cookie('login_token', "blahblahblahblahblah");
            res.cookie("logininfo", {userid:req.body.login.userid,password:req.body.login.password,loginstamp: Date.now()});
            console.log("SESSION ID: " + req.session);
            res.redirect('/');
        }
    });
}

exports.logout = function(req,res){
    res.clearCookie('logininfo');
    res.redirect('/');
}

exports.submit = function(req,res){
    var currentuser = 'bowens';
    var datum = '{"JSONTYPE":515,"Entry":{"name":"bobby", "rank":"captain"}}'
    console.log("ADDING USER DATA: ");
    client.query("UPDATE users SET userdata = '"+datum+"' WHERE userlogin = '"+currentuser+"'");
    res.redirect('/');
}

exports.retrieve = function(req, res){
    var userlogin = "bowens",userpass = "oracle", thesql = "SELECT * FROM users WHERE userlogin = '" + userlogin + "' AND userpass = '" + userpass + "'";
    client.query(thesql, function (err, posts){

        if(err)
            res.send('404 Not found', 404);

        else {
	    var jason = posts.rows[0].userdata;
	    jason.Entry.lastchange = Date.now();
            console.log(posts.rows[0].userdata);
	    client.query("UPDATE users SET userdata = '"+JSON.stringify(jason)+"' WHERE userlogin = '"+userlogin+"'");
            console.log("I Should be showing data here");
            res.redirect('/');
        }
    });  
}
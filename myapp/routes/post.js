var moment = require('moment');
var pg = require('pg');
var client = new pg.Client('postgres://master1:harper123@localhost:5432/mastercontrol');
client.connect();

exports.new = function(req, res){
    res.render('newpost', { title: 'Posting' });
};

exports.submit = function(req,res){
    datum = [Date(),req.body.post.title, req.body.post.content, req.body.post.desc,0,'localhost'];
    client.query("INSERT INTO nodeposts(create_stamp, post_name, post_content,post_desc,author,host_name) values(to_timestamp($1), $2, $3, $4, $5, $6)", datum);

    console.log("TITLE: "+title);
}

exports.submit = function(req, res){
};

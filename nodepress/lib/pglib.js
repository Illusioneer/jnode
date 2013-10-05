var pg = require('pg');

//require database-config

var url = require('url');
var client = new pg.Client('postgres://master1:harper123@localhost:5432/mastercontrol');
client.connect();


//submit content
exports.putter = function(req, res){ 
    client.query("INSERT INTO nodeposts(create_stamp, post_name, post_content,post_desc,author,host_name,metadata) values(to_timestamp($1), $2, $3, $4, $5, $6,$7)", datablob);        
}

//query for content
exports.getter = function(req, res) {
    var blobert = " ";
    var thesql = "SELECT * FROM nodeposts ORDER BY create_stamp DESC";
    console.log("QUERY: " + thesql);
    
    client.query(thesql, function (err, posts){

	if(err)
	    blobert = err;

	else {
	    blobert = JSON.stringify(posts.rows);
	    res.render('index', { title: 'Fun List', posts: posts, layout: true });
	    console.log("Blobert says: " + blobert);
	}
    });
}
//authenticate user
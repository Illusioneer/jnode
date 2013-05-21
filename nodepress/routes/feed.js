//open db connection
var moment = require('moment');
var pg = require('pg');
var client = new pg.Client('postgres://master1:harper123@localhost:5432/mastercontrol');
client.connect();
var posts = "SELECT * FROM nodeposts ORDER BY publish_stamp DESC LIMIT 5";



// Initializing feed object
var feed = new Feed({
    title:          'My Feed Title',
    description:    'This is my personnal feed!',
    link:           'http://example.com/',
    image:          'http://example.com/logo.png',
    copyright:      'Copyright © 2013 John Doe. All rights reserved',

    author: {
        name:       'John Doe',
        email:      'john.doe@example.com',
        link:       'https://example.com/john-doe'
    }
});

// Function requesting the last 5 posts to a database. This is just an
// example, use the way you prefer to get your posts.
Post.findPosts(function(posts, err) {
    if(err)
        res.send('404 Not found', 404);
    else {
        for(var key in posts) {
            feed.item({
                title:          posts[key].title,
                link:           posts[key].url,
                description:    posts[key].description,
                date:           posts[key].date
            });
        }

    }
});

exports.feed = function(req, res){
    res.set('Content-Type', 'text/xml');
    res.send(feed.render('rss-2.0'));
};

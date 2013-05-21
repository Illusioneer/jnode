
/*
 * GET home page.
 */

exports.post = function(req, res){
    res.render('index', { title: 'Posting' });
};

/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.render('user', { title: 'User List' + req.params.name, layout: true });
};

exports.node = function(req, res){
    var db = require('../db');
    var rez = db.updatestats();
    res.render('node', { title: 'node List', datum: req.params, serv: rez[1], layout: true });
};

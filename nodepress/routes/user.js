exports.list = function(req, res){
    res.render('user', { title: 'User List' + req.params.name, name: req.params.name, layout: true });
};


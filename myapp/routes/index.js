
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log("From the nodes:" + db.updatestats);
  res.render('index', { title: 'Express' });
};

/*
 * GET home page.
 */

exports.index = function(req, res){

  if(!res.login) {
    console.log("Checking for login");
  }

  res.cookie('user', JSON.stringify({
      'username': "KaiserSoso",
      'role': "Boss",
      'loginstamp': Date.now()
  }));

  res.render('index', { title: 'Express', loggedin: true });
};
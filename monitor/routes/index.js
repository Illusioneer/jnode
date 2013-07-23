
/*
 * GET home page.
 */

exports.index = function(req, res){

  //var logincookie = JSON.parse(req.cookies.logininfo);

  if (logincookie = req.cookies.logininfo) {
      console.log('logininfo exists');
      if ((Date.now() - logincookie.loginstamp) > 400000 ) {
          console.log("Your login is stale, deleting it.");
          res.clearCookie('logininfo');
      }
      console.log(Date.now() - logincookie.loginstamp);
  }

//    if (req.cookies.logininfo.loginstamp) {console.log("QUERY: " + req.cookies.logininfo.loginstamp)};

  typeof req.cookies.logininfo === 'undefined' ? loggedin = false : loggedin = true;
  console.log("logged in reads as " + loggedin);
  res.render('index', { title: 'Express', loggedin: loggedin });
};
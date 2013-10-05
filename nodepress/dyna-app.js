var express=require("express");
var app=express();
var fs=require("fs");
var http = require('http'), path = require('path');

// all environments
app.set('port', process.env.PORT || 9123);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser({uploadDir:'./tmp'}));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var routePath = "./routers/";
fs.readdirSync(routePath).forEach(function(file) {
    console.log("Loading..." + routePath+file);
    var route=routePath+file;
    require(route)(app);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
//app.listen(9123);
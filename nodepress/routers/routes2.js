var path = require('path'),
 fs = require('fs');

module.exports=function(app){
  
    app.get('/uploader',function(req,res){
       res.render('uploader', { title: 'Posting' });
    });

    app.post('/upload', function (req, res) {
    var tempPath = req.files.file.path,
        targetPath = path.resolve('./uploads/'+req.files.file.name);
    if (path.extname(req.files.file.name).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            console.log("Upload completed!");
	    //console.log(req.files.file);
        });
    } else {
        fs.unlink(tempPath, function () {
            if (err) throw err;
            console.error("Only .png files are allowed!");
        });
    }

  });
    
}  
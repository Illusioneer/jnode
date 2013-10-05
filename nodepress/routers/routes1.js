module.exports=function(app){
  app.get('/',function(req,res){
     res.send('/ called successfully...');
  });
  
  app.get('/haha', function(req,res){
     res.send('FOOLED YOU!...');
  });
  
}
exports.save = function(userlogin,userpass) {
  
      blobject = {}
      //blobject.searchusers = "SELECT * FROM users WHERE userlogin = '" + userlogin + "' AND userpass = '" + userpass + "';";
      
      return {
	searchusers : "SELECT * FROM users WHERE userlogin = '" + userlogin + "' AND userpass = '" + userpass + "';",
	woot : "Woot!",
	wow : function () {console.log(this.woot + hummer)},
	well : 200
      }; 
	
}
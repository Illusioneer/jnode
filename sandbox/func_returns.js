function classy() {
  
  this.verve = "speedy!",
  this.stat = 21,
  this.whodat = "Yo skeezy",
  this.greetins = function () {console.log(this.whodat)};
  
}


function atest(hummer) {
  
  return {
    carz: hummer,
    woot : "Woot!",
    wow : function () {console.log(this.woot + hummer)},
    well : 200
  }
  
}

var maths = new classy();


maths.whodat = "yo hoody!";
maths.greetins();

var mutatis = atest("fnord");

mutatis.wow();
mutatis.well = 100;
console.log(mutatis.well);

var mutande = new atest;

console.log(typeof mutande("why").carz);
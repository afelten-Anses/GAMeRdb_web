const model = require('./Model.njs'); // use Model.js as a NodeJS module
model.filterByAttribute("Phylogeny.Serovar","Typhimurium", function(result){
	var ress=JSON.stringify(result)
	console.log(ress)
	console.log("ok")
})

// model.findAttribute("Phylogeny.Serovar","Typhimurium", function(result){
// 	console.log(result+"wow")//callback demo Arnaud
// 	//console.log(result)
// })
// console.log(attr);
// var maci=model.direBonjour2("lol")
// console.log(maci)
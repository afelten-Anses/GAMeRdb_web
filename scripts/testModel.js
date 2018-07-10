// const model = require('./Model.njs'); // use Model.js as a NodeJS module
// model.filterByAttribute("Phylogeny.Serovar","Typhimurium", function(result){
// 	var ress=JSON.stringify(result)
// 	console.log(ress)
// 	console.log("ok")
// })
const model = require('./Model'); // use Model.js as a NodeJS module
model.sendAllJson(function(result){
	var ress=JSON.stringify(result)
	console.log(ress)
	console.log("ok")
})
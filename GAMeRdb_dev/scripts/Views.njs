// **** Author : Kevin Durimel 
// **** Goal : Generate view froms GAMeRdb data

/*
	---	VIEWS init : modules, MVC scripts, args ---
*/
// NodeJS modules
const fs = require('fs'); //filesystem (file parser)
const url = require('url'); // url parser
const path = require('path'); //path parser
// External modules
const template = require('templatesjs'); // useful for header and footer 'includes'
const validator = require('validator'); // queries validator and sanitizer
const querystring = require('querystring'); // query parser and stringifyier
// MVC scripts dependencies
const model = require('./Model.njs'); // use Model.js as a NodeJS module
const views = require('./Views.njs'); // use Views.js as a NodeJS module

// Render specific dataTables for each species
function renderDataTables(species,callback,response,template,msg) // callback : controller script callback, response,template,msg : values required from controller script
{
	model.filterByAttribute("Phylogeny.Genus",species, function(result)
	{
		template.set(callback, function(errors,callback) // templatesJS
		{
			if(errors)
			{
				throw errors;
			}
			else
			{
				console.log("lolilol")
				var JSONstring = result // from model SucessCallback
				var list = // list of variables that needed to be rendered dynamically
				{
					datatablesJSON : JSON.stringify(JSONstring)
				}
				//console.log(JSONstring) //dev
				template.renderAll(list, function(err,callback)
			    {
			    	if(err) 
			    	{
			    		throw err;
			    	}
			    	else
			    	{
			    		response.writeHead(msg,{'Content-Type': 'text/html','Cache-Control': 'no-cache'});
			    		response.end(callback);
			    	}
			    })
			}
		})
	});
}

exports.renderDataTables = renderDataTables;

// model.filterByAttribute(MongoAttribute,MongoValue, function(result)
// 		    	{
// 		    		template.set(contents, function(errors,contents) // templatesJS
// 		    		{
// 						if(errors)
// 					    {
// 					    	throw errors;
// 					    }
// 					    else
// 					    {
// 							var JSONstring = result // from model SucessCallback
// 							var list = // list of variables that needed to be rendered dynamically
// 							{
// 								datatablesJSON : JSON.stringify(JSONstring),
// 							}
// 							//console.log(JSONstring) //dev
// 							template.renderAll(list, function(err,contents)
// 			    			{
// 			                	if(err) 
// 			                	{
// 			                		throw err;
// 			                	}
// 			                	else
// 			                	{
// 			                		res.writeHead(msg,{'Content-Type': 'text/html','Cache-Control': 'no-cache'});
// 									res.end(contents);
// 			                	}
// 			     			})
// 		     			}
// 					})
// 		     	});
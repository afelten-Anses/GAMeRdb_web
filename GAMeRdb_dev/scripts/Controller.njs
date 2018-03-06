// -Author : Kevin Durimel 
// -Goal : Controller script (MVC Scheme)
// -External depencies : templatesjs,validator

/*A FAIRE AVANT LA MISE EN PRODUCTION :
	-En tête de reponse (res.writehead) avec 'Cache-Control': 'no-cache' (interet en prod : eviter biais d'affichage de pages pendant les maj du code controleur.js)
	-COMMENTER Tout ce qui est commenté 'debug trace' et rennomer debug trace par 'trace'
	-Ecouter sur le port 80 + mettre en place reverse proxy (avec compression de reponses http) : 	https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04
																									https://eladnava.com/binding-nodejs-port-80-using-nginx/
																									--> Utilité :  possible d'écouter sur le port 80 (dond adresse ip a taper sans le port)
																									ajouter des filtres,module
																									compression du contenu

	-Démarrage automatique au boot : https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04
	-ReVerifier 100% async, callbacks pour toutes les fonctions
	-Crypter mot de passe GAMeRdb

*/

/*Rappels :
	-Includes front-end automatisé avec readFileAndInclude()
	-Includes back-end avec res.render('flag','texte_a_inclure') pour include vite fait les retours du modele (mettre au format directement dans le modele!)
*/


/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
												*******	CONTROLLER init : modules, MVC scripts, args *******
*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// NodeJS modules
const http = require('http'); //httpserver
// more sockets per host  (default = 5) ==> increase performance. decrease if case of excessive ressources draining
const agent = new http.Agent({
   maxSockets: 25
});
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
// Network configuration
var listenIp = process.argv[2] || '192.168.184.133'; // default listening ip
var listenPort = process.argv[3] || 3000; //default listening port
// Args
const params = require('commander'); //arguments parser
// Used for automatic type MIME attribution in readServerFileAutoMime()
const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt',
    '.gff': 'text/plain',
    '.log': 'text/plain',
    '.fasta': 'text/plain',
    '.fa' : 'text/plain',
    '.fq' : 'text/plain',
    '.vcf': 'text/plain',
    '.fastq': 'text/plain',
    '.gff': 'text/plain',
    '.gbk': 'text/plain',
    '.gz' : 'application/gzip',
    '.tsv' : 'text/plain',
    '.woff2' : 'font/woff2',
    '.woff' : 'font/woff',
    '.txt' : 'text/plain'
  };
// Used in order to restrict access to these files
const prohibed = [
	'/Controller.njs',
  	'/Model.njs',
  	'/Views.njs'
  	];


/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
															*******	CONTROLLER code *******
*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// --- App usage --- //
params
  .version('0.1.0')
  .option('-d, --dev', 'dev mode (run app in localhost mode)')
  .parse(process.argv);

// --- if  --dev mode : change localhost ip to server ip --- //
if(params.dev) 
{
	listenIp = '127.0.0.1';
	listenPort = 3000;
}

// --- App : controller (+view engine) --- //
var server = http.createServer(function(req, res) 
{
	var urlPath = url.parse(req.url).pathname; // URL without query
	var params = querystring.parse(url.parse(req.url).query); // URL with query
	var fileName = urlPath.split("/").pop(-1); // requested filename

	console.log(req.url); //debug trace
	console.log("file requested : " + fileName); // debug trace
	console.log(params); //debug trace


	// Read server files and send it to client
	function readServerFile(filePath,type,msg) // Filepath : file requested / type : MIME-Type / msg : server response code
	{
		let ext = path.parse(filePath).ext; // Parse file requested to retrieve file extension (ext)

		fs.readFile(filePath, function (errors, contents) 
		{
			if(errors)
			{
				send500(`Error getting the file ${filePath} : ${errors}.`); // if this file/path EXISTS cant be reached for any reason
				throw errors;
			}
			else
			{
				res.writeHead(msg,{'Content-Type': type ,'Cache-Control': 'no-cache'});
				res.end(contents); // envoyer le contenu (contents de fonction en parametre de fs.readfile) en réponse
			}
		});
		console.log('contenu ' + filePath + ' chargé , mimeType : ' + mimeType[ext]); //debug trace
	}

	// Read server files and send it to client : automatic MIME type attribution // type : Content-Type / msg : server response code
	function readServerFileAutoMime(filePath,msg) 
	{
		let ext = path.parse(filePath).ext; // Parse file requested to retrieve file extension (ext)

		fs.readFile(filePath, function (errors, contents) 
		{
			if(errors)
			{
			  	send500(`Error getting the file ${filePath} : ${errors}.`); // if this file/path EXISTS cant be reached for any reason
			  	throw errors;
		     }
		     else
		     {
		     	res.writeHead(msg,{'Content-Type': mimeType[ext] || 'application/octet-stream' ,'Cache-Control': 'no-cache'}); // type MIME or application/octet-stream if unknown extension
			  	res.end(contents);
		     }
		});
		console.log('contenu ' + filePath + ' chargé , mimeType : ' + mimeType[ext]); //debug trace
	}

	// Read server files and send it to client WITH Templatejs VIEW PROECESSING : includes headers and foooter
	function readFileAndInclude(templateFilePath,msg)
	{
		fs.readFile(templateFilePath, function (errors, contents) 
		{
			if(errors)
			{
			  	console.log(errors);
			  	send500(`Error getting the file ${templateFilePath} : ${errors}.`); //if this file/path EXISTS cant be reached for any reason
			  	throw errors;
		    }
		    else
		    {
		    	template.set(contents, function(errors,contents) // templatesJS
		    	{
		    		if(errors)
		    		{
		    			throw errors;
		    		}
		    		else
		    		{
		    			res.writeHead(msg,{'Content-Type': 'text/html','Cache-Control': 'no-cache'});
						res.end(contents);
		     		}
		     	});
		     }
		});
	}

	// Read server files and send it to client WITH Templatejs VIEW PROECESSING : includes headers and foooter AND MongoDB retrieved variables
	function readFileAndIncludeAndRender(templateFilePath,msg,MongoAttribute,MongoValue)
	{
		console.log('readFileAndIncludeAndRender'); //debug trace
		fs.readFile(templateFilePath, function (errors, contents) 
		{
			if(errors)
			{
			  	console.log(errors);
			  	send500(`Error getting the file ${templateFilePath} : ${errors}.`); //if this file/path EXISTS cant be reached for any reason
			  	throw errors;
		    }
		    else
		    {
		    	
		    	model.filterByAttribute(MongoAttribute,MongoValue, function(result)
		    	{
		    		template.set(contents, function(errors,contents) // templatesJS
		    		{
						if(errors)
					    {
					    	throw errors;
					    }
					    else
					    {
							var JSONstring = result //callback demo Arnaud
							var list = 
							{
								datatablesJSON : JSON.stringify(JSONstring),
								test : "youpi"
							}
							console.log(JSONstring)
							template.renderAll(list, function(err,contents)
			    			{
			                	if(err) 
			                	{
			                		throw err;
			                	}
			                	else
			                	{
			                		res.writeHead(msg,{'Content-Type': 'text/html','Cache-Control': 'no-cache'});
									res.end(contents);
			                	}
			     			})
		     			}
					})
		     	});
		    }
		});
	}


	// Pseudo dynamic routing for page by species
	function routeFilesBySpecies(species)
	{
		console.log('routeFilesBySpecies'); //debug trace
		if(urlPath === `/species/${species}/blast.html`) // blast page
		{
			readFileAndInclude(`./../interface/views/species/${species}/blast.html`,200);
		}
		else if(urlPath === `/species/${species}/distribution.html`) // distribution page
		{
			readFileAndInclude(`./../interface/views/species/${species}/distribution.html`,200);
		}
		else if(urlPath === `/species/${species}/genomes.html`) // genomes page
		{
			readFileAndIncludeAndRender(`./../interface/views/species/${species}/genomes.html`,200,"Phylogeny.Genus","Salmonella");
			// readFileAndInclude(`./../interface/views/species/${species}/genomes.html`,200);
		}
		else if(urlPath === `/species/${species}/naura.html`) // Naura tool page
		{
			readFileAndInclude(`./../interface/views/species/${species}/naura.html`,200);
		}
		else if(urlPath === `/species/${species}/phylogeny.html`) // Phylogeny page
		{
			readFileAndInclude(`./../interface/views/species/${species}/phylogeny.html`,200);
		}
		else if(urlPath === `/species/${species}/quickphylo.html`) // Quickphylo page
		{
			readFileAndInclude(`./../interface/views/species/${species}/quickphylo.html`,200);
		}
		else if(urlPath === `/species/${species}/refs.html`) // References page
		{
			readFileAndInclude(`./../interface/views/species/${species}/refs.html`,200);
		}
		else
		{
			send404(`routeFilesBySpecies() : File file not found for ${species}`);
		}
	}

	function send404(message) // file not found
	{
		console.log(message);
		readFileAndInclude('./../interface/views/404.html',404);
	}

	function send403(message)
	{
		console.log(message);
		readFileAndInclude('./../interface/views/403.html',403);
	}

	function send500(message) // internal server error
	{
		console.log(message);
		readFileAndInclude('./../interface/views/500.html',500);
	}

	function processpost2(req, res) // put POST request in a JSON file
	{
		if (req.method == 'POST')
		{
			var jsonString = '';
			var reqUtf = req.setEncoding('utf8'); // utf-8 encoding POST request
	        reqUtf.on('data', function (data) 
	        {
	        	jsonString += data;
	        });
	        reqUtf.on('end', function () 
	        {
	        	console.log(JSON.parse(jsonString));
	        });
	    }
	}

	/*//////////////////////////////////////////////////////////////////////////////////////////////////////////*
										ROUTING AND VIEWS PROCESSING
	*///////////////////////////////////////////////////////////////////////////////////////////////////////////*

	
	//////													   //////							 									
	///////////////// STATIC FILES : Manual routing /////////////////
	//////													   //////								     								   


	// CSS and JS 
	//
	
	if (urlPath === '/semantic/dist/semantic.min.css')
	{
		readServerFile('./../semantic/dist/semantic.min.css','text/css',200);
	}
	else if (urlPath === '/DATA/GAMeR_DB/SALMONELLA/11CEB4447SAL/11CEB4447SAL.gff')
	{
		readServerFile('/media/NAS/DATA/GAMeR_DB/SALMONELLA/11CEB4447SAL/11CEB4447SAL.gff','text/plain',200);
	}
	else if (urlPath === '/semantic/dist/semantic.min.js')
	{
		readServerFile('./../semantic/dist/semantic.min.js','application/javascript',200);
	}
	else if (urlPath === '/js/jquery.min.js')
	{
		readServerFile('./../interface/js/jquery.min.js','application/javascript',200);
	}
	else if (urlPath === '/js/gamer.effects.js')
	{
		readServerFile('./../interface/js/gamer.effects.js','application/javascript',200);
	}
	else if (urlPath === '/semantic/dist/components/icon.min.css')
	{
		readServerFile('./../semantic/dist/components/icon.min.css','text/css',200);
	}
	else if (urlPath === '/css/gamer.effects.datatables.css')
	{
		readServerFile('./../interface/css/gamer.effects.datatables.css','text/css',200);
	}
	else if (urlPath === '/css/dataTables.semanticui.min.css')
	{
		readServerFile('./../interface/css/dataTables.semanticui.min.css','text/css',200);
	}
	else if (urlPath === '/css/select.dataTables.min.css')
	{
		readServerFile('./../interface/css/select.dataTables.min.css','text/css',200);
	}
	else if (urlPath === '/css/buttons.semanticui.min.css')
	{
		readServerFile('./../interface/css/buttons.semanticui.min.css','text/css',200);
	}
	else if (urlPath === '/js/jquery.min.js')
	{
		readServerFile('./../interface/js/jquery.min.js','application/javascript',200);
	}
	else if (urlPath === '/js/jquery-1.12.4.js')
	{
		readServerFile('./../interface/js/jquery-1.12.4.js','application/javascript',200);
	}
	else if (urlPath === '/js/jquery.dataTables.min.js')
	{
		readServerFile('./../interface/js/jquery.dataTables.min.js','application/javascript',200);
	}
	else if (urlPath === '/js/dataTables.semanticui.min.js')
	{
		readServerFile('./../interface/js/dataTables.semanticui.min.js','application/javascript',200);
	}
	else if (urlPath === '/js/dataTables.select.min.js')
	{
		readServerFile('./../interface/js/dataTables.select.min.js','application/javascript',200);
	}
	else if (urlPath === '/js/buttons.semanticui.min.js')
	{
		readServerFile('./../interface/js/buttons.semanticui.min.js','application/javascript',200);
	}
	else if (urlPath === '/js/dataTables.buttons.min.js')
	{
		readServerFile('./../interface/js/dataTables.buttons.min.js','application/javascript',200);
	}
	else if (urlPath === '/js/jszip.min.js')
	{
		readServerFile('./../interface/js/jszip.min.js','application/javascript',200);
	}
	else if (urlPath === '/js/pdfmake.min.js')
	{
		readServerFile('./../interface/js/pdfmake.min.js','application/javascript',200);
	}
	else if (urlPath === '/js/vfs_fonts.js')
	{
		readServerFile('./../interface/js/vfs_fonts.js','application/javascript',200);
	}
	else if (urlPath === '/js/buttons.html5.min.js')
	{
		readServerFile('./../interface/js/buttons.html5.min.js','application/javascript',200);
	}
	else if (urlPath === '/js/buttons.print.min.js')
	{
		readServerFile('./../interface/js/buttons.print.min.js','application/javascript',200);
	}
	else if (urlPath === '/js/buttons.colVis.min.js')
	{
		readServerFile('./../interface/js/buttons.colVis.min.js','application/javascript',200);
	}

	//
	// IMAGES
	//

	else if(urlPath === '/img/anseslogomini.png' || urlPath === '/views/img/anseslogomini.png') // support adresse depuis 1er niveau (views/xxx) et 2e niveau(views/species/xxx) du site
	{ 
		readServerFile('./../interface/img/anseslogomini.png','image/png',200);
	}
	else if(urlPath === '/img/gamergenomicdblogo.png') // test
	{ 
		readServerFile('./../interface/img/gamergenomicdblogo.png','image/png',200);
	}
	else if(urlPath === '/img/statistics.png') // test
	{ 
		readServerFile('./../interface/img/statistics.png','image/png',200);
	}
	else if(urlPath === '/img/ansesgamer.png' || urlPath === '/views/img/ansesgamer.png') // support adresse depuis 1er niveau (views/xxx) et 2e niveau(views/species/xxx) du site
	{ 
		readServerFile('./../interface/img/ansesgamer.png','image/png',200);
	}
	else if(urlPath === '/img/statistics.png') // test
	{ 
		readServerFile('./../interface/img/statistics.png','image/png',200);
	}
	else if(urlPath === '/img/favicon.ico' || urlPath === '/views/img/favicon.ico') // support adresse depuis 1er niveau (views/xxx) et 2e niveau(views/species/xxx) du site
	{ 
	 	readServerFile('./../interface/img/favicon.ico','image/x-icon',200);
	}

	//
	// FONTS 
	//

	else if(urlPath === '/semantic/dist/themes/default/assets/fonts/icons.woff2')
	{ 
		readServerFile('./../semantic/dist/themes/default/assets/fonts/icons.woff2','application/x-font-woff',200);
	}
	else if(urlPath === '/semantic/dist/themes/default/assets/fonts/icons.woff')
	{ 
		readServerFile('./../semantic/dist:themes/default/assets/fonts/icons.woff','application/x-font-woff',200);
	}
	else if(urlPath === '/semantic/dist/themes/default/assets/fonts/icons.ttf')
	{ 
		readServerFile('./../semantic/dist/themes/default/assets/fonts/icons.ttf','application/x-font-ttf',200);
	}
	

	//
	// TEMPLATES Views
	//

	//Homepage
	else if(urlPath === '/' ||  urlPath === '/home') 
	{
		readFileAndInclude('./../interface/views/homepage/index.html',200);
		processpost2(req,res);
	}
	//all species page
	else if(urlPath.indexOf('/species/')>=0) // indexOf returns -1 if the string is not found. It will return 0 if the string start with 'views/species'(index of the occurence)
	{
		console.log('path species'); //debug trace
		if(urlPath.indexOf('bacillus')>=0)
		{
			routeFilesBySpecies('bacillus');
		}
		else if(urlPath.indexOf('clostridium')>=0)
		{
			routeFilesBySpecies('clostridium');
		}
		else if(urlPath.indexOf('listeria')>=0)
		{
			routeFilesBySpecies('listeria');
		}
		else if(urlPath.indexOf('salmonella')>=0)
		{
			routeFilesBySpecies('salmonella');
		}
		else if(urlPath.indexOf('staphylococcus')>=0)
		{
			routeFilesBySpecies('salmonella');
		}
		else
		{
			console.log('Species not found!'); 
			send404("Species not found or didn't exist");
		}
	}

	//
	// PROHIBED ACCESS
	//

	else if(prohibed.indexOf(urlPath)>=0)
	{
		send403(); // access denied
	}

	//////																	 	 //////							 									
	///////////////// NAS FILES : auto-routing for existing paths /////////////////////
	//////																	    ///////	

	// !!! ---> This method works only for NAS files or when url request == file path <--- !!!
	
	else
	{ 
		console.log(`${req.method} ${req.url}`);
		// add a '.' before urlPath in order to use it inside fs.exists()
		let pathname = `.${urlPath}`;
		// maps file extention to MIME types
		fs.exists(pathname, function (exist) 
		{
			if(!exist) // send 404 page if path doesn't exist
			{
			send404(`File ${pathname} not found!`);
			}
			else // read file from file system path
			{
				fs.readFile(pathname, function(err, data)
				{
					if(err) // if this file/path EXISTS cant be reached for any reason
					{
						send500(`Error getting the file: ${err}.`);
					} 
					else
					{
						readServerFileAutoMime(pathname,200);
					}
				});
			}
		});	
	}
})

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
													******* START SERVER and show some info  *******
*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

server.listen(listenPort,listenIp);
console.log('Server running at http://' + listenIp + ':' + listenPort);
//debug
blabla=model.direBonjour(); // model import test
bye=model.direByeBye();
console.log(blabla + ' et ' + bye);
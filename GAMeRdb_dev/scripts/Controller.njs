// -Author : Kevin Durimel 
// -Goal : Controller script (MVC Scheme)

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
												*******	CONTROLLER init : modules, MVC scripts, args *******
*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// NodeJS modules
var http = require('http'); //httpserver
var fs = require('fs'); //filesystem (file parser)
var url = require('url'); // url parser
// External modules
var template = require('templatesjs'); // useful for header and footer "includes"
var validator = require('validator'); // queries validator and sanitizer
var querystring = require('querystring') // query parser
// MVC scripts dependencies
var model = require('./Model.njs') // use Model.js as a NodeJS module
var views = require('./Views.njs') // use Views.js as a NodeJS module
// Network configuration
var listenPort = 3001; //default listening port
var listenIp = '192.168.184.133'; // default listening ip
// Args
const args = process.argv; //basic args parse


/*A FAIRE AVANT LA MISE EN PRODUCTION :
	-En tête de reponse (res.writehead) avec 'Cache-Control': 'no-cache' (interet en prod : eviter biais d'affichage de pages pendant les maj du code controleur.js)
	-Parsing d'arguments pour le mode --dev (commenter)
	-Tout ce qui est commenté "debug"
	-Ecouter sur le port 80°
*/

/*Rappels :
	-Includes front-end automatisé avec readFileAndInclude()
	-Includes back-end avec res.render("flag","texte_a_inclure") pour include vite fait les retours du modele (mettre au format directement dans le modele!)
*/


/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
															*******	CONTROLLER code *******
*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// if  --dev mode : change localhost ip to server ip
if(args[2]!= null && args[2]==="--dev")
{
	listenIp = '127.0.0.1';
	listenPort = 3000;
}

var server = http.createServer(function(req, res) 
{
	var urlPath = url.parse(req.url).pathname;
	var params = querystring.parse(url.parse(req.url).query);

	console.log(req.url); //debug
	console.log(params); //debug

	// Read server files and send it to client
	function readServerFile(filePath,type,msg) // type : Content-Type / msg : server response code
	{
		fs.readFile(filePath, function (errors, contents) 
			{
				if(errors)
				{
			  		console.log(errors);
			  		throw errors;
		     		}
		     		else
		     		{
		     			res.writeHead(msg,{'Content-Type': type,'Cache-Control': 'no-cache'});
			  			res.end(contents); // envoyer le contenu (contents de fonction en parametre de fs.readfile) en réponse
		     		}
			});
		console.log('contenu ' + filePath + ' chargé');
	}

	// Read server files and send it to client + includes
	function readFileAndInclude(templateFilePath,type,msg) // type : Content-Type / msg : server response code
	{
		fs.readFile(templateFilePath, function (errors, contents) 
		{
			if(errors)
			{
			  	console.log(errors);
			  	throw errors;
		    }
		     else
		     {
		     	var data = template.setSync(contents);
		     	res.writeHead(msg,{'Content-Type': type,'Cache-Control': 'no-cache'});
				res.end(data);
		     }
		});
	}

	/*//////////////////////////////////////////////////////////////////////////////////////////////////////////*
										ROUTING AND VIEWS PROCESSING
	*///////////////////////////////////////////////////////////////////////////////////////////////////////////*

	//readServerFile('./../semantic/dist/semantic.min.css','text/css',200);
	// note : routage plus rapide en utilisant switch au lieu de if/else mais aléatoire si on rafraichit 
	//trop vite les pages


	//
	// CSS and JS Files Routing
	//

	if (urlPath === '/semantic/dist/semantic.min.css')
	{
		readServerFile('./../semantic/dist/semantic.min.css','text/css',200);
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
	// IMAGES routing
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
	// FONTS routing
	//

	else if(urlPath === '/semantic/dist/themes/default/assets/fonts/icons.woff2') // test
	{ 
		readServerFile('./../semantic/dist/themes/default/assets/fonts/icons.woff2','application/x-font-woff',200);
	}
	else if(urlPath === '/semantic/dist/themes/default/assets/fonts/icons.woff') // test
	{ 
		readServerFile('./../semantic/dist:themes/default/assets/fonts/icons.woff','application/x-font-woff',200);
	}
	else if(urlPath === '/semantic/dist/themes/default/assets/fonts/icons.ttf') // test
	{ 
		readServerFile('./../semantic/dist/themes/default/assets/fonts/icons.ttf','application/x-font-ttf',200);
	}
	

	//
	// TEMPLATES routing and VIEWS PROCESSING
	//

	else if(urlPath === '/' ||  urlPath === '/home') //Page d'accueil
	{
		readFileAndInclude('./../interface/views/homepage/index.html','text/html',200);
	}
	else if(urlPath === '/views/species/homepage/index.html') //Page d'accueil
	{
		readFileAndInclude('./../interface/views/homepage/index.html','text/html',200);
	}
	else if(urlPath === '/ffdfsdgdsgs') // test
	{ 
		readFileAndInclude('./../interface/views/tmp_tests/testgenomes.html','text/html',200);
	}
	else if(urlPath === '/views/species/salmonella/salmogenomes.html') // test
	{ 
		readFileAndInclude('./../interface/views/species/salmonella/salmogenomes.html','text/html',200);
	}

	//
	// 404 Page
	//
	else //Ressource demandée introuvable : erreur 404
	{ 
		readFileAndInclude('./../interface/views/404.html','text/html',404);
	}
})

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
													******* START SERVER and show some info  *******
*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

server.listen(listenPort,listenIp);
console.log('Server running at http://' + listenIp + ':' + listenPort);
blabla=model.direBonjour(); // model import test
bye=model.direByeBye();
console.log(blabla + " et " + bye);
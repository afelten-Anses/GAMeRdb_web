var http = require('http'); //httpserver
var fs = require('fs'); //filesystem (file parser)
var url = require('url'); // url parser
// var express = require('express');
// var app = express(); 
var querystring = require('querystring') // query parser
var pageDemandee = '/views/homepage/index.html';
var listenPort = 3000;
var listenIp = '127.0.0.1';
var model = require('./Model') // use Model.js as a NodeJS module
var template = require('templatesjs');

//params de DEV:
	//en tête de reponse (res.writehead) avec 'Cache-Control': 'no-cache'
	//pour eviter biais d'affichage de pages pendant les maj du code controleur.js
//rappels :
	//includes front-end automatisé avec readFileAndInclude()
	//includes back-end avec res.render("flag","texte_a_inclure") pour include vite fait les retours du modele (mettre au format directement dans le modele!)

var server = http.createServer(function(req, res) 
{

	// var params = querystring.parse(url.parse(req.url).query);
	var urlPath = url.parse(req.url).pathname;
	var params = querystring.parse(url.parse(req.url).query);

	console.log(req.url); //debug
	console.log(params); //debug

	//Read and show html template to front-end
	function ReadServerFile(filePath,type,msg) // type : Content-Type / msg : server response code
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

	//Read and show PROCESSED html template to front-end
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
	


	/*////////////////////////////////////////////////////*
						GESTION DES ROUTES
	*/////////////////////////////////////////////////////*
	//ReadServerFile('./../semantic/dist/semantic.min.css','text/css',200);
	// note : routage plus rapide en utilisant switch au lieu de if/else mais aléatoire si on rafraichit 
	//trop vite les pages
	//
	//STATIC Files
	//
	if (urlPath === '/semantic/dist/semantic.min.css')
	{
		ReadServerFile('./../semantic/dist/semantic.min.css','text/css',200);
	}
	else if (urlPath === '/semantic/dist/semantic.min.js')
	{
		ReadServerFile('./../semantic/dist/semantic.min.js','application/javascript',200);
	}
	//
	// PAGES
	//
	else if(urlPath === '/') //Page d'accueil
	{
		readFileAndInclude('./../interface/views/homepage/index.html','text/html',200);
	}
	else if(urlPath === '/ffdfsdgdsgs') // test
	{ 
		ReadServerFile('./../interface/views/tmp_tests/testgenomes.html','text/html',200);
	}
	//
	// IMAGES
	//
	else if(urlPath === '/img/anseslogomini.png') // test
	{ 
		ReadServerFile('./../interface/img/anseslogomini.png','image/png',200);
	}
	else if(urlPath === '/img/gamergenomicdblogo.png') // test
	{ 
		ReadServerFile('./../interface/img/gamergenomicdblogo.png','image/png',200);
	}
	else if(urlPath === '/img/statistics.png') // test
	{ 
		ReadServerFile('./../interface/img/statistics.png','image/png',200);
	}
	else if(urlPath === '/img/ansesgamer.png') // test
	{ 
		ReadServerFile('./../interface/img/ansesgamer.png','image/png',200);
	}
	else if(urlPath === '/img/statistics.png') // test
	{ 
		ReadServerFile('./../interface/img/statistics.png','image/png',200);
	}
	else if(urlPath === '/img/favicon.ico') // test
	{ 
	 	ReadServerFile('./../interface/img/favicon.ico','image/x-icon',200);
	}
	//
	// FONTS
	//
	else if(urlPath === '/semantic/dist/themes/default/assets/fonts/icons.woff2') // test
	{ 
		ReadServerFile('./../semantic/dist/themes/default/assets/fonts/icons.woff2','application/x-font-woff',200);
	}
	else if(urlPath === '/semantic/dist/themes/default/assets/fonts/icons.woff') // test
	{ 
		ReadServerFile('./../semantic/dist:themes/default/assets/fonts/icons.woff','application/x-font-woff',200);
	}
	else if(urlPath === '/semantic/dist/themes/default/assets/fonts/icons.ttf') // test
	{ 
		ReadServerFile('./../semantic/dist/themes/default/assets/fonts/icons.ttf','application/x-font-ttf',200);
	}
	else //Ressource demandée introuvable : erreur 404
	{ 
		ReadServerFile('./../interface/views/404.html','text/html',404);
	}
})
server.listen(listenPort,listenIp);
console.log('Server running at http://' + listenIp + ':' + listenPort);
blabla=model.direBonjour();
console.log(blabla);
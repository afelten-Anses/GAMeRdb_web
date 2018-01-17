var http = require('http'); //httpserver
var fs = require('fs'); //filesystem (file parser)
var url = require('url'); // url parser
var querystring = require('querystring') // query parser
var pageDemandee = '/views/homepage/index.html';
var listenPort = 3000;
var listenIp = '127.0.0.1';
// var expressApp = require('express');
// var expressApp = expressApp();

//params de DEV:
	//en tête de reponse (res.writehead) avec 'Cache-Control': 'no-cache'
	//pour eviter biais d'affichage de pages pendant les maj du code controleur.js

var server = http.createServer(function(req, res) 
{
	/*////////////////////////////////////////////////////*
						GESTION DES ROUTES
	*/////////////////////////////////////////////////////*

	console.log(req.url); //debug

	// var params = querystring.parse(url.parse(req.url).query);
	var page = url.parse(req.url).pathname;
	var params = querystring.parse(url.parse(req.url).query);
	console.log('page'+ page);
	console.log(params);
	switch (page)
	{
		case '/': //Page d'accueil

			fs.readFile('./../interface/views/homepage/index.html', 'utf8', function (errors, contents) 
			{
				if(errors)
				{
			  		console.log(errors);
		     		}
		     		else
		     		{
		     			res.writeHead(200,{'Content-Type': 'text/html','Cache-Control': 'no-cache'});
			  			res.end(contents); // envoyer le contenu (contents de fonction en parametre de fs.readfile) en réponse
		     		}
		});

		case '/semantic/dist/semantic.min.css':

			fs.readFile('./../semantic/dist/semantic.min.css', function (errors, css) 
			{
				if(errors)
				{
			  		console.log(errors);
			  		throw err;
		     		}
		     		else
		     		{
		     			console.log('csselse');
		     			res.writeHead(200,{'Content-Type': 'text/css','Cache-Control': 'no-cache'});
			  			res.end(css); // envoyer le contenu (contents de fonction en parametre de fs.readfile) en réponse
		     		}
			});

		case 'ffdfsdgdsgs' : //sinon : ressource demandéé introuvable

			fs.readFile('./../interface/views/tmp_tests/testgenomes.html', function (errors, image) 
			{
				if(errors)
				{
			  		console.log(errors);
			  		throw err;
		     	}
		     	else
		     	{
		     		console.log('else'); //debug
		     		res.writeHead(404,{'Content-Type': 'text/html','Cache-Control': 'no-cache'});
			  		return res.end(image); // envoyer le contenu (contents de fonction en parametre de fs.readfile) en réponse
		     	}
			});

		default : //sinon : ressource demandéé introuvable

			fs.readFile('./../interface/views/404.html', function (errors, image) 
			{
				if(errors)
				{
			  		console.log(errors);
			  		throw err;
		     	}
		     	else
		     	{
		     		console.log('else'); //debug
		     		res.writeHead(404,{'Content-Type': 'text/html','Cache-Control': 'no-cache'});
			  		return res.end(image); // envoyer le contenu (contents de fonction en parametre de fs.readfile) en réponse
		     	}
			});
	}
})
server.listen(listenPort,listenIp);
console.log('Server running at http://' + listenIp + ':' + listenPort);

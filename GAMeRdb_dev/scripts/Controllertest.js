var http = require('http'); //httpserver
var fs = require('fs'); //filesystem (file parser)
var url = require('url'); // url parser
var express = require('express');
var app = express(); 
var querystring = require('querystring') // query parser
var pageDemandee = '/views/homepage/index.html';
var listenPort = 3000;
var listenIp = '127.0.0.1';
var model = require('./Model') // use Model.js as a NodeJS module
var expressApp = require('express');
var expressApp = expressApp();
var resolve = require('resolve');

//params de DEV:
	//en tête de reponse (res.writehead) avec 'Cache-Control': 'no-cache'
	//pour eviter biais d'affichage de pages pendant les maj du code controleur.js
//app.set('views', path.join(__dirname, '../interface/views/'));

expressApp.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render('/home/wrecker/EspaceDeTravailLinux/GIT/ANSES/GAMeRdbi/jan17/GAMeRdb_web/GAMeRdb_dev/interface/views/homepage/index.ejs', {etage: '2ezfsefx'});
});
expressApp.listen(3000)

// var server = http.createServer(function(req, res) 
// {

// 	app.get('/', function(req, res) {

//     res.setHeader('Content-Type', 'text/plain');

//     res.end('Vous êtes à l\'accueil');

// });
// 	if (urlPath === '/semantic/dist/semantic.min.css')
// 	{
// 		ReadServerFile('./../semantic/dist/semantic.min.css','text/css',200);
// 	}
// 	else if (urlPath === '/semantic/dist/semantic.min.js')
// 	{
// 		ReadServerFile('./../semantic/dist/semantic.min.js','application/javascript',200);
// 	}
// 	//
// 	// PAGES
// 	//
// 	else if(urlPath === '/') //Page d'accueil
// 	{
// 		ReadServerFile('./../interface/views/homepage/index.html','text/html',200);
// 	}
// 	else if(urlPath ==='/ffdfsdgdsgs') // test
// 	{ 
// 		ReadServerFile('./../interface/views/tmp_tests/testgenomes.html','text/html',200);
// 	}
// 	//
// 	// IMAGES
// 	//
// 	else if(urlPath ==='/img/anseslogomini.png') // test
// 	{ 
// 		ReadServerFile('./../interface/img/anseslogomini.png','image/png',200);
// 	}
// 	else if(urlPath ==='/img/gamergenomicdblogo.png') // test
// 	{ 
// 		ReadServerFile('./../interface/img/gamergenomicdblogo.png','image/png',200);
// 	}
// 	else if(urlPath ==='/img/statistics.png') // test
// 	{ 
// 		ReadServerFile('./../interface/img/statistics.png','image/png',200);
// 	}
// 	else if(urlPath ==='/img/ansesgamer.png') // test
// 	{ 
// 		ReadServerFile('./../interface/img/ansesgamer.png','image/png',200);
// 	}
// 	else if(urlPath ==='/img/statistics.png') // test
// 	{ 
// 		ReadServerFile('./../interface/img/statistics.png','image/png',200);
// 	}
// 	//
// 	// FONTS
// 	//
// 	else if(urlPath === '/semantic/dist/themes/default/assets/fonts/icons.woff2') // test
// 	{ 
// 		ReadServerFile('./../semantic/dist/themes/default/assets/fonts/icons.woff2','application/x-font-woff',200);
// 	}
// 	else if(urlPath === '/semantic/dist/themes/default/assets/fonts/icons.woff') // test
// 	{ 
// 		ReadServerFile('./../semantic/dist:themes/default/assets/fonts/icons.woff','application/x-font-woff',200);
// 	}
// 	else if(urlPath === '/semantic/dist/themes/default/assets/fonts/icons.ttf') // test
// 	{ 
// 		ReadServerFile('./../semantic/dist/themes/default/assets/fonts/icons.ttf','application/x-font-ttf',200);
// 	}
// 	else //Ressource demandée introuvable : erreur 404
// 	{ 
// 		ReadServerFile('./../interface/views/404.html','text/html',404);
// 	}
// })
// server.listen(listenPort,listenIp);
// console.log('Server running at http://' + listenIp + ':' + listenPort);
// blabla=model.direBonjour();
// console.log(blabla);
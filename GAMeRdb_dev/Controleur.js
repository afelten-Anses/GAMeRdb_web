var http = require('http');
var fs = require("fs");
var pageDemandee = "homepage/index.html";
var listenPort = 3000;
var listenIp = "127.0.0.1";

var app = http.createServer(function(req, res) 
{
	fs.readFile("views/interface/" + pageDemandee, "utf8", function (errors, contents) 
	{
		if(errors)
		{
          		console.log(errors);
     		}
     		else
     		{
          		res.end(contents);
     		}
	});
})
app.listen(listenPort,listenIp);
console.log("Server running at http://" + listenIp + ':' + listenPort);

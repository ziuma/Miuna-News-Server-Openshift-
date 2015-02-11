var	port = process.env.OPENSHIFT_NODEJS_PORT, 
	ip = process.env.OPENSHIFT_NODEJS_IP;

var http = require('http'),
	express = require('express'),
	MiunaNewsServer = require('./lib/miunanews-server'),
	app = express();

var server = http.createServer(app).listen(port, ip);
MiunaNewsServer.listen(server);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});
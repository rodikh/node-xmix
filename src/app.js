'use strict';

var express = require('express'),
	http = require('http'),
	path = require('path'),
	app = express(),
	socketio = require('socket.io'),
	engine = require('ejs-locals');

// Configure express
app.configure(function () {
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.engine('ejs', engine);
	app.set('view engine', 'ejs');
	app.use(express.static(path.join(__dirname, '../public')));
	app.use(express.favicon());

	// new bodyParser, handle json and url encoded content.
	app.use(express.json());
	app.use(express.urlencoded());

	app.use(app.router);
	app.disable('x-powered-by');

});

// Create the http server
var server = http.createServer(app).listen(app.get('port'), function () {
	console.log('Server is listening on port:', app.get('port'));
});

var io = socketio.listen(server, { log: false });

// Configure routes
require('./routes')(app);
require('./sockets')(app, io);

// Expose application
module.exports = exports = app;

module.exports = function (app) {
	'use strict';
	var util = require('util');

	var gameController = require('./gameController');

	app.get('/', function (request, response) {
		response.render('./game.ejs', { });
	});
};

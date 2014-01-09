module.exports = function (app) {
	'use strict';
	var util = require('util');

	var lobbyController = require('./lobbyController');
	var gameController = require('./gameController');

	app.get('/', function (request, response) {
		response.render('lobby.ejs', {games: lobbyController.getGames()});
	});

	app.get('/create_game', function (request, response) {
		var game = lobbyController.createGame();
		response.redirect('/game/'+game.id);
	});

	app.get('/game/:id', function (request, response) {
		response.render('game.ejs', {gameId: request.params.id});
	});
};

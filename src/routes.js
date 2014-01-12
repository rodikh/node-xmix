module.exports = function (app) {
	'use strict';
	var util = require('util');

	var LobbyController = require('./controllers/LobbyController');
	var GameController = require('./controllers/GameController');

	app.get('/', function (request, response) {
		response.render('lobby.ejs', {games: LobbyController.getGames()});
	});

	app.get('/create_game', function (request, response) {
		var game = LobbyController.createGame();
		response.redirect('/game/'+game.id);
	});

	app.get('/game/:id', function (request, response) {
		var game = LobbyController.getGame(request.params.id);
		if (game) {
			response.render('game.ejs', {game:game});
		} else {
			response.redirect('/');
		}
	});
};

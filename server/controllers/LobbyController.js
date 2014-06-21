(function () {
	'use strict';
	var GameController = require('./GameController');
	module.exports = {
		// The only exported function
		createGame: function () {
			var game = new GameController();
			games.push(game);
			game.id = games.indexOf(game);
			return game;
		},
		deleteGame: function () {

		},
		getGames: function () {
			return games;
		},
		getGame: function (id) {
			return games[id];
		}
	};

	// private
	var games = [];
})();

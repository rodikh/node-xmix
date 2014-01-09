module.exports = function (app, io) {
	'use strict';
	var lobby = require('./lobbyController');

	io.sockets.on('connection', function (socket) {
		var currentGameId;
		socket.on('joinGame', function (gameId) {
			socket.join(gameId);
			currentGameId = gameId;
		});
		socket.on('getBoard', function (callback) {
			var game = lobby.getGame(currentGameId);
			if (game){
				callback(game.getBoard());
			}
		});
		socket.on('makeMove', function (data, callback) {
			var game = lobby.getGame(currentGameId);
			if (game){
				var board = game.makeMove(data.x, data.y, data.player);
				callback(board);
				io.sockets.emit('boardChanged', board);

				var checkWin = game.checkWin();
				console.log("checkWin", checkWin);
				if (checkWin !== 0) {
					io.sockets.emit('gameOver', checkWin);
					var newBoard = game.resetBoard();
					io.sockets.emit('boardChanged', newBoard);
				}
			}
		});

		socket.on('resetGame', function () {
			var game = lobby.getGame(currentGameId);
			if (game){
				var newBoard = game.resetBoard();
				io.sockets.emit('boardChanged', newBoard);
			}
		});
	});

};

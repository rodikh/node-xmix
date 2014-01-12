module.exports = function (app, io) {
	'use strict';
	var lobby = require('./controllers/LobbyController');

	io.sockets.on('connection', function (socket) {
		socket.on('joinGame', function (gameId, callback) {
			socket.join(gameId);
			var game = lobby.getGame(gameId);
			var player = game.addPlayer(socket);
			if (player) {
				socket.game = game;
				socket.playerId = player;
				console.log("player:" + player + " joined game:" + gameId);
				io.sockets.in(gameId).emit('playerJoined', socket.playerId);
				if (typeof callback === "function") {
					callback({playerId: player, players: game.getPlayers()});
				}
			} else{
				console.log("game " + gameId + " is full! cannot join");
			}
		});
		socket.on('disconnect', function () {
			if (socket.game) {
				var index = socket.game.removePlayer(socket);
				io.sockets.in(socket.game.id).emit('playerLeft', socket.playerId);
			}
		});
		socket.on('getBoard', function (callback) {
			if (socket.game) {
				var game = lobby.getGame(socket.game.id);
				if (game){
					callback(game.getBoard());
				}
			}
		});
		socket.on('makeMove', function (data, callback) {
			if (socket.game) {
				var game = lobby.getGame(socket.game.id);
				if (game){
					var board = game.makeMove(data.x, data.player);
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
			}
		});

		socket.on('resetGame', function () {
			if (socket.game) {
				var game = lobby.getGame(socket.game.id);
				if (game){
					var newBoard = game.resetBoard();
					io.sockets.emit('boardChanged', newBoard);
				}
			}
		});
	});

};

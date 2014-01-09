module.exports = function (app) {
	'use strict';
	var gameController = require('./gameController');
	var io = require('socket.io').listen(3001, { log: false });

	io.sockets.on('connection', function (socket) {
		socket.on('getBoard', function (callback) {
			callback(gameController.getBoard());
		});
		socket.on('makeMove', function (data, callback) {
			var result = gameController.makeMove(data.x, data.y, data.player);
			callback(result);
//			if (typeof result === "array"){
				io.sockets.emit('boardChanged', result);
//			} else {
//				io.sockets.emit('gameOver', result);
//			}
		});

		socket.on('resetGame', function () {
			var newBoard = gameController.resetBoard();
			io.sockets.emit('boardChanged', newBoard);
		});
	});

};

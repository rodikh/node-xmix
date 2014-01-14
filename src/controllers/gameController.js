(function () {
	'use strict';
	module.exports = function () {
		// The only exported function
		this.getBoard = function () {
			return board;
		};
		this.makeMove = function (x, player) {
			if (parseInt(player, 10) === turn) {
//				console.log("making move", x, player);
				board[x] = player;
				turn = 3 - turn;
				return board;
			} else {
				return board;
			}
		};
		this.resetBoard = function () {
			board =  [0,0,0,0,0,0,0,0,0];
			turn = 1;
			return board;
		};
		this.checkWin = function () {
			var i, first;
			for (i=0; i<3; i++) {
				first = board[i*3];
				if ((first !== 0) && (first === board[i*3+1]) && (first === board[i*3+2])) {
					return first;
				}
				first = board[i];
				if ((first !== 0) && (first === board[i+3]) && (first === board[i+6])) {
					return first;
				}
			}

			first = board[4];
			if ((first !== 0) && (first === board[0]) && (first === board[8])) {
				return first;
			}
			if ((first !== 0) && (first === board[2]) && (first === board[6])) {
				return first;
			}

			if (board.indexOf(0) !== -1) {
				return 0; // no win, continue
			}
			return -1; // game tie
		};
		this.addPlayer = function (socket) {
			if (!players[0]) {
				players[0] = socket;
				return 1;
			} else if (!players[1]) {
				players[1] = socket;
				return 2;
			}
			return 0;
		};
		this.removePlayer = function (socket) {
			var index = players.indexOf(socket);
			delete players[index];
			return index+1;
		};
		this.getPlayers = function () {
			var flatPlayers = [],
				i;
			for (i in players) {
				if (players.hasOwnProperty(i)){
					flatPlayers.push(players[i].playerId);
				}
			}
			return flatPlayers;
		};

		var board = [0,0,0,0,0,0,0,0,0];
		var turn = 1;
		var players = [];
	};
})();

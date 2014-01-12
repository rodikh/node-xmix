(function () {
	'use strict';
	module.exports = function () {
		// The only exported function
		this.getBoard = function () {
			return board;
		},
		this.makeMove = function (x, y, player) {
			if (parseInt(player, 10) === turn) {
				console.log("making move", x, y, player);
				board[y][x] = player;
				turn = 3 - turn;
				return board;
			} else {
				return board;
			}

		},
		this.resetBoard = function () {
			board = [[0,0,0],[0,0,0],[0,0,0]];
			turn = 1;
			return board;
		},
		this.checkWin = function () {
			var i, j, first;
			for (i=0; i<3; i++) {
				first = board[i][0];
				if ((first !== 0) && (first === board[i][1]) && (first === board[i][2])) {
					console.log("win 1:", board[i][0], board);
					return board[i][0];
				}
			}
			for (j=0;j<3;j++) {
				first = board[0][j];
				if ((first !== 0) && (first === board[1][j]) && (first === board[2][j])) {
					console.log("win 2:", board[0][j]);
					return board[0][j];
				}
			}

			first = board[0][0];
			if ((first !== 0) && (first === board[1][1]) && (first === board[2][2])) {
				console.log("win 3:", board[0][0]);
				return board[0][0];
			}

			first = board[0][2];
			if ((first !== 0) && (first === board[1][1]) && (first === board[2][0])) {
				console.log("win 4:", board[0][2]);
				return board[0][2];
			}

			for (i=0;i<3;i++) {
				for (j=0;j<3;j++) {
					if (board[i][j] === 0) {
						return 0; // no win, continue
					}
				}
			}
			console.log("win tie");
			return -1; // game tie
		}

		var board = [[0,0,0],[0,0,0],[0,0,0]];
		var turn = 1;
	};
})();

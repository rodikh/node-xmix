(function () {
	'use strict';
	module.exports = {
		// The only exported function
		getBoard: function () {
			return board;
		},
		makeMove: function (x, y, player) {
			console.log("making move", x, y, player);
			board[y][x] = player;
			var chkwin = this.checkWin();
//			if (chkwin !== 0) {
//				return chkwin;
//			}
			return board;
		},
		resetBoard: function () {
			board = [[0,0,0],[0,0,0],[0,0,0]];
			return board;
		},
		checkWin: function () {
			var i,j;
			for (i=0;i<3;i++) {
				if (board[i][0] === board[i][1] === board[i][2] !== 0) {
					return board[i][0];
				}
			}
			for (j=0;j<3;j++) {
				if (board[0][j] === board[1][j] === board[2][j] !== 0) {
					return board[0][j];
				}
			}
			if (board[0][0] === board[1][1] === board[2][2] !== 0) {
				return board[0][0];
			}
			if (board[0][2] === board[1][1] === board[2][0] !== 0) {
				return board[0][2];
			}
			for (i=0;i<3;i++) {
				for (j=0;j<3;j++) {
					if (board[i][j] === 0) {
						return 0; // no win, continue
					}
				}
			}
			return -1; // game tie
		}
	};

	var board = [[0,0,0],[0,0,0],[0,0,0]];
})();

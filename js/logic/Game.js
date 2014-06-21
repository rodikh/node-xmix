(function (window, Board) {
    'use strict';

    var Game = function () {
    };

    /**
     * Resets the game to initial parameters
     */
    Game.prototype.reset = function () {
        console.log('Game: Resetting');
        this.board = [0,0,0,0,0,0,0,0,0];
        this.turn = 1;
        this.winState = 0;
    };

    /**
     * Applies a new move to the board.
     * @param {Number} index place on the board to change
     * @param {Number} player player value
     * @returns {Number} Winner state (0 - no winner, -1 - tie, 1-2 - winner)
     */
    Game.prototype.makeMove = function (index, player) {
        if (this.board[index] === 0 && player === this.turn && this.winState === 0) {
            this.board[index] = player;
            this.turn = 3 - this.turn; // switch turn from 1 to 2 and vice versa
        }

        return this.checkWin();
    };

    /**
     * Checks if the board is in a win/tie situation
     * @returns {Number} Winner state (0 - no winner, -1 - tie, 1-2 - winner)
     */
    Game.prototype.checkWin = function () {
        var i, first;
        for (i=0; i<3; i++) {
            first = this.board[i*3];
            if ((first !== 0) && (first === this.board[i*3+1]) && (first === this.board[i*3+2])) {
                this.winState = first;
                return first;
            }
            first = this.board[i];
            if ((first !== 0) && (first === this.board[i+3]) && (first === this.board[i+6])) {
                this.winState = first;
                return first;
            }
        }

        first = this.board[4];
        if ((first !== 0) && (first === this.board[0]) && (first === this.board[8])) {
            this.winState = first;
            return first;
        }
        if ((first !== 0) && (first === this.board[2]) && (first === this.board[6])) {
            this.winState = first;
            return first;
        }

        if (this.board.indexOf(0) !== -1) {
            return 0; // no win, continue
        }

        this.winState = -1;
        return -1; // game tie
    };

    window.Game = Game;
 
} (window, window.Board));
(function (window) {
    'use strict';

    var Game = function () {
    };

    Game.prototype.reset = function () {
        console.log('Game: Resetting');
    };

    window.Game = Game;
 
} (window));
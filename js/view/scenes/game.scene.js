(function (window, GraphicsEngine, Game, MenuUtils) {
    'use strict';

    GraphicsEngine.prototype.gameScene = function () {
        this.stage.removeAllChildren();
        var gameContainer = new createjs.Container();
        this.setBackground(gameContainer, 'bg-game');
        this.addContainer(gameContainer, 'game');

        var buttonContainer = MenuUtils.createButtonContainer({label: 'Exit', name:'mainMenuScene'}, {x: 20, y:  50});
        buttonContainer.on('click', this.exit, this);
        gameContainer.addChild(buttonContainer);

        var game = window.game = new Game();

        createjs.Ticker.removeAllEventListeners('tick');
        createjs.Ticker.setFPS(10);

        game.reset();
        createjs.Ticker.on('tick', this.gameLoop, this, false, {game: game, container: gameContainer, graphics: this});
        this.stage.update();
    };

    GraphicsEngine.prototype.gameLoop = function (event, args) {

    };

    GraphicsEngine.prototype.exit = function(event) {
        /*jshint validthis: true */
        createjs.Ticker.removeAllEventListeners('tick');
        MenuUtils.sceneButton.call(this, event);
    };

} (window, window.GraphicsEngine, window.Game, window.MenuUtils));

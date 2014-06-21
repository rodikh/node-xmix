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
        game.reset();

        var state = game.makeMove(1,1);
        console.log('game',game.board);
        console.log('game.state',state);

        state = game.makeMove(5,2);
        state = game.makeMove(0,1);
        state = game.makeMove(3,2);
        state = game.makeMove(2,1);

        console.log('game',game.board);
        console.log('game.state',state);

        this.stage.update();
    };



    GraphicsEngine.prototype.exit = function(event) {
        /*jshint validthis: true */
        createjs.Ticker.removeAllEventListeners('tick');
        MenuUtils.sceneButton.call(this, event);
    };

} (window, window.GraphicsEngine, window.Game, window.MenuUtils));

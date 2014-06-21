(function (window, GraphicsEngine, MenuUtils) {
    'use strict';

    var menuButtons = [
        {label: 'New Game', name: 'gameScene'}
    ];

    function drawMenu(screenContainer, buttonsConfig, graphics) {
        var MENU_X = graphics.stage.canvas.width / 2;
        var MENU_Y = graphics.stage.canvas.height / 2;

        var menuContainer = new createjs.Container();
        var i, length = buttonsConfig.length;
        for (i = 0; i < length; i++) {
            var buttonContainer = MenuUtils.createButtonContainer(buttonsConfig[i], {x: 0, y: (i * 50)});
            buttonContainer.on('click', MenuUtils.sceneButton, graphics);
            menuContainer.addChild(buttonContainer);
        }

        var menuBounds = menuContainer.getBounds();
        menuContainer.x = MENU_X - menuBounds.width / 2;
        menuContainer.y = MENU_Y - menuBounds.height / 2;
        graphics.addContainer(menuContainer, 'menu', screenContainer);
    }

    GraphicsEngine.prototype.mainMenuScene = function () {
        this.stage.removeAllChildren();
        var screenContainer = new createjs.Container();
        this.setBackground(screenContainer, 'bg-menu');

        this.addContainer(this.createText('Xmix'));

        drawMenu(screenContainer, menuButtons, this);
        this.addContainer(screenContainer, 'screen');

        this.stage.update();
    };
} (window, window.GraphicsEngine, window.MenuUtils));

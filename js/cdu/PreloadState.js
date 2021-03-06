/**
 * cdu.PreloadState
 * 
 * Copyright (c) chongdashu
 * http://github.com/chongdashu/adventure-jam-2015
 */
this.cdu = this.cdu||{};

(function() {
    "use strict";

/**
 * PreloadState
 * @class PreloadState
 * @constructor
 **/
var PreloadState = function(game) {
};
var p = PreloadState.prototype;
    
    p.logo = null;
    p.loadingFrame = null;
    p.loadingBar = null;
    p.loadingText = null;

    // @phaser
    p.preload = function() {
        console.log("[PreloadState], preload()");

        // Preloader specific stuff.
        // -------------------------
        this.game.world.setBounds(
            -GLOBAL_GAME_WIDTH/2,
            -GLOBAL_GAME_HEIGHT/2,
            GLOBAL_GAME_WIDTH, GLOBAL_GAME_HEIGHT);

        this.loadingFrame = this.game.add.sprite(0,0, "preloader-frame");
        this.loadingBar = this.game.add.sprite(0,0, "preloader-bar");
        this.loadingText = this.game.add.text(0,0, "Loading: 0%", { font: "16pt Garamond", align: "center", color : "FFFFFF"});

        this.loadingFrame.anchor.set(0.5);
        this.loadingBar.anchor.set(0.5);
        this.loadingText.anchor.set(0.5);

        this.load.setPreloadSprite(this.loadingBar);

        // Loading begins here.
        // --------------------
        game.load.tilemap('level-1-map', 'assets/levels/level-1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('level-1', 'assets/levels/level-1.png');
        game.load.image('circle', 'assets/circle.png');
        game.load.image('player', 'assets/player.png');
        game.load.image("door1_key", "assets/door1_key.png");
        game.load.image("door1-closed", "assets/door1-closed.png");
        game.load.image("door1-opened", "assets/door1-opened.png");
        game.load.text('items-interactions', 'assets/json/items-interactions.json');
        
       
    };

    // @phaser
    p.create = function() {
        console.log("[PreloadState], create()");
        this.loadingBar.cropEnabled = false;
        this.state.start("GameState");
        
    };

    // @phaser
    p.loadUpdate = function() {
        this.loadingText.text = "Loading: " + this.load.progress + "%";
    };
    

// Link
// ----
cdu.PreloadState = PreloadState;

}());



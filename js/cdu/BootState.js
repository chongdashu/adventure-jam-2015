/**
 * cdu.BootState
 * 
 * Copyright (c) chongdashu
 * http://github.com/chongdashu/adventure-jam-2015
 */
this.cdu = this.cdu||{};

(function() {
    "use strict";

/**
 * BootState
 * @class BootState
 * @constructor
 **/
var BootState = function(game) {
  this.init();
};
var p = BootState.prototype;
// BootState.prototype.constructor = BootState;

    // @phaser
    p.init = function()
    {
        console.log("[BootState], init()");

        if (!this.game) {
            return;
        }


        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.game.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        // this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            //  If you have any desktop specific settings, they can go in here
            this.scale.pageAlignHorizontally = true;
        }
        else
        {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }
    };

    // @phaser
    p.preload = function() {
        console.log("[BootState], preload()");

        this.load.image('preloader-frame', 'assets/preloader-frame.png');
        this.load.image('preloader-bar', 'assets/preloader-bar.png');
    };

    // @phaser
    p.create = function() {
        console.log("[BootState], create()");
        this.state.start("PreloadState");
    };
    

// Link
// ----
cdu.BootState = BootState;

}());



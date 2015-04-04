/**
 * cdu.GameState
 * 
 * Copyright (c) chongdashu
 * http://github.com/chongdashu/adventure-jam-2015
 */
this.cdu = this.cdu||{};

(function() {
    "use strict";

/**
 * GameState
 * @class GameState
 * @constructor
 **/
var GameState = function(game) {
};
var p = GameState.prototype;

       
    // @phaser
    p.preload = function() {
        console.log("[GameState], preload()");
       
    };

    // @phaser
    p.create = function() {
        console.log("[GameState], create()");

        this.physics.startSystem(Phaser.Physics.P2JS);

        var map = game.add.tilemap('level-1');
        map.addTilesetImage('background-test');
        var layer = map.createLayer('Tile Layer 1');
        layer.x -= GLOBAL_GAME_WIDTH/2;
        layer.y -= GLOBAL_GAME_HEIGHT/2;
        layer.anchor.set(0.5);

        this.add.sprite(0,0,"circle");
       

        console.log(map.layers);

        this.a = this.physics.p2.convertCollisionObjects(map,"Object Layer 1");
        var a= this.a;
        for (var i=0; i < a.length; a++) {
            
            console.log(a[i].x, a[i].y);
            a[i].x += GLOBAL_GAME_WIDTH/2;
            a[i].y += GLOBAL_GAME_HEIGHT/2;
            console.log(a[i].x, a[i].y);
            a[i].debug= true;
        }

    };

    // @phaser
    p.update = function() {
       

    };

    

// Link
// ----
cdu.GameState = GameState;

}());



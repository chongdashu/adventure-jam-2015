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
        
    // Bitmaps
    // -------
    p.polygonBitmap = null;

    // Fields
    // ------
    p.polygons = [];
    p.lastClickPoint = null;
       
    // @phaser
    p.preload = function() {
        console.log("[GameState], preload()");
        console.log(this.scale.currentScaleMode);
        // this.scale.setGameSize(960, 640);
        // this.scale.maxWidth = 960;
        // this.scale.maxHeight = 640;
        // this.scale.minWidth = 960;
        // this.scale.minHeight = 640;
        // this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
       
    };

    // @phaser
    p.create = function() {
        console.log("[GameState], create()");

        game.physics.startSystem(Phaser.Physics.ARCADE);

        var map = game.add.tilemap('level-1-map');

        var circle = this.add.sprite(0,0,"circle");
        var bg = this.add.sprite(0,0,"level-1");
        bg.anchor.set(0.5);
        circle.anchor.set(0.5);

        this.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
        this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
        this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';

        this.polygonBitmap = this.game.add.image(-GLOBAL_GAME_WIDTH/2,-GLOBAL_GAME_HEIGHT/2,this.bitmap);
        this.polygonBitmap.BlendMode = Phaser.blendModes.MULTIPLY;
        
        this.createPolygonsFromMap(map);


        this.player = this.game.add.sprite(0,100,"player");
        this.player.anchor.set(0.5);
        this.physics.arcade.enable(this.player);
        this.input.onDown.add(this.movePlayer, this);

    };

    p.movePlayer = function() {
        console.log(this.game.input.activePointer.x, this.game.input.activePointer.y);
        console.log(this.polygons[0]);
        console.log(this.polygons[0].contains(this.game.input.activePointer.x, this.game.input.activePointer.y));
        // game.physics.arcade.moveToPointer(this.player, 100);
        var worldPos = this.screenToWorld(this.game.input.activePointer.x, this.game.input.activePointer.y);

        this.lastClickPoint = new Phaser.Point(worldPos[0], worldPos[1]);
        game.physics.arcade.moveToXY(this.player, this.lastClickPoint.x, this.lastClickPoint.y-this.player.height/2);
        // game.physics.arcade.moveToXY(this.player, -50, 100, 100);
    };

    p.createPolygonsFromMap = function(map) {
        console.log(map.objects);
        var objects = map.objects["Object Layer 1"];
        for (var i=0; i < objects.length; i++) {
            var object = objects[i];
            
            var polylines = [];
            for (var j=0; j < object.polyline.length; j++) {
                var polyline = object.polyline[j];
                polylines.push(polyline[0]+object.x, polyline[1]+object.y);
            }

            var polygon = new Phaser.Polygon(polylines);
            console.log("%o", object);
            console.log("%o", object.polyline);
            console.log("%o", polygon);

            this.polygons.push(polygon);
        }

    };



    // @phaser
    p.update = function() {

        // Next, fill the entire light bitmap with a dark shadow color.
        this.bitmap.context.fillStyle = 'rgb(100, 100, 100)';
        this.bitmap.context.clearRect(0, 0, this.game.width, this.game.height);
       
       for (var i=0; i < this.polygons.length; i++) {
        
            var polygon = this.polygons[i];
            var points = polygon.points;
            this.bitmap.context.beginPath();
            this.bitmap.context.fillStyle = 'rgba(100, 0, 0, 0.7)';
            this.bitmap.context.moveTo(points[0].x, points[0].y);

            for (var j=0; j < polygon.points.length; j++) {
                this.bitmap.context.lineTo(points[j].x, points[j].y);
                // console.log(j, points[j].x, points[j].y);
            }
            this.bitmap.context.closePath();
            this.bitmap.context.fill();
    
        }

        var walk = this.polygons[0];
        var screenPos = this.worldToScreen(this.player.x, this.player.y+this.player.height/2);

        if (this.lastClickPoint) {


            if (Phaser.Math.fuzzyEqual(this.player.x, this.lastClickPoint.x, 10) && Phaser.Math.fuzzyEqual(this.player.y+this.player.height/2, this.lastClickPoint.y, 10)) {
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 0;
            }
        }
        if (!walk.contains(screenPos[0], screenPos[1])){

            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
        }

    };

    p.worldToScreen = function(x, y) {
        return [x+GLOBAL_GAME_WIDTH/2, y+GLOBAL_GAME_HEIGHT/2];
    };

    p.screenToWorld = function(x, y) {
        return [x-GLOBAL_GAME_WIDTH/2, y-GLOBAL_GAME_HEIGHT/2];
    };

    p.render = function() {
        game.debug.inputInfo(16, 16);
        game.debug.bodyInfo(this.player, 16, 160);
        game.debug.body(this.player);
    };

    

// Link
// ----
cdu.GameState = GameState;

}());



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
       
    // @phaser
    p.preload = function() {
        console.log("[GameState], preload()");
       
    };

    // @phaser
    p.create = function() {
        console.log("[GameState], create()");

        this.physics.startSystem(Phaser.Physics.P2JS);

        var map = game.add.tilemap('level-1');

        var circle = this.add.sprite(0,0,"circle");
        var bg = this.add.sprite(0,0,"background-test");
        bg.anchor.set(0.5);
        circle.anchor.set(0.5);

        this.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
        this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
        this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';

        this.polygonBitmap = this.game.add.image(-GLOBAL_GAME_WIDTH/2,-GLOBAL_GAME_HEIGHT/2,this.bitmap);
        this.polygonBitmap.BlendMode = Phaser.blendModes.MULTIPLY;
        
        
        

        this.createPolygonsFromMap(map);

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
    
        
    };

    

// Link
// ----
cdu.GameState = GameState;

}());



var game = null;

var GLOBAL_GAME_WIDTH = 1024;
var GLOBAL_GAME_HEIGHT = 768;

$(document).ready(function() {
    
    // Create the phaser context.
    // --------------------------
    game = new Phaser.Game(GLOBAL_GAME_WIDTH, GLOBAL_GAME_HEIGHT, Phaser.AUTO, "game-container");

    // Add all states.
    // ---------------
    game.state.add("BootState", cdu.BootState);
    game.state.add("PreloadState", cdu.PreloadState);
    game.state.add("GameState", cdu.GameState);

    // Start with boot sequence.
    // -------------------------
    game.state.start("BootState");

});

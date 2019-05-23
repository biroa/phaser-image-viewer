var GameState = {
    // We preload all the images, audio etc ...
    preload:function(){},
    // We can init the preloaded data in the section
    create: function(){},
    // We can update the state of the created objects
    update: function(){},
};

// Set the canvas or the webGL stage width, height, (auto detect: WebGL, Canvas, Headless)
var game = new Phaser.Game(800,600,Phaser.AUTO);
game.state.add( 'GameState',  GameState );
game.state.start( 'GameState' );

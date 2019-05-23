// Default path of the background(s)
var path = 'assets/images/';
// Set the size of the Stage
var stageWidth  = 800;
var stageHeight = 450;

// --==Gallery Image Properties==--
var gPath = path + 'galleries/1/';

// The ideal image size should be 
// width:  600px
// height: 400px

var GalleryState = {
    // We preload all the images, audio etc ...
    preload:function(){
        
        // load the background
        this.load.image('background', path + 'background.jpeg');
        this.load.image('arrow', path + 'arrow2.png');
        
        this.load.image('p1', gPath + 'punk-band.jpg');
        this.load.image('p2', gPath + 'punk-portrait.jpg');
        this.load.image('p3', gPath + 'punk-portrait2.jpg');
    },
    // We can init the preloaded data in the section
    create: function(){

        //scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //have the gallery centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //screen size will be set automatically
        this.scale.setScreenSize(true);

        //create a sprite for the background
        this.background = this.game.add.sprite(0, 0, 'background');

        var galleryData = [
            {key:'p1', title:'Test Image 1', desc:'The desc 1 comes here', info:''},
            {key:'p2', title:'Test Image 2', desc:'The desc 2 comes here', info:''},
            {key:'p3', title:'Test Image 3', desc:'The desc 3 comes here', info:''}
        ];    

        // Create a group to store a gallery
        // The group is necessary to store the image elements in an object and apply animation(s) on each item.
        this.gallery = this.game.add.group();
        
        var self = this, gallery;        
        // the loop comes here

        
        // --==Left Arrow==--
        //   --==Start==--
        
        this.leftArrow = this.game.add.sprite(30, this.game.world.centerY, 'arrow');
        this.leftArrow.anchor.setTo(0.5);
        this.leftArrow.scale.setTo(0.07);
        this.leftArrow.customParams = {direction: -1};
        
        this.leftArrow.angle = -180;
        
        // --==Left Arrow User Input==--
        this.leftArrow.inputEnabled = true;
        // We do not need the pixel Perfect Click in this case
        //this.rightArrow.input.pixelPerfectClick = true;
        this.leftArrow.events.onInputDown.add(this.switchImage, this);
        
        // --==Right Arrow==--
        //    --==Start==--
        
        this.rightArrow = this.game.add.sprite(770, this.game.world.centerY, 'arrow');
        this.rightArrow.anchor.setTo(0.5);
        this.rightArrow.scale.setTo(0.07);
        this.rightArrow.customParams = {direction: 1};
        
        // --==Right Arrow User Input==--
        this.rightArrow.inputEnabled = true;
        // We do not need the pixel Perfect Click in this case
        //this.rightArrow.input.pixelPerfectClick = true;
        this.rightArrow.events.onInputDown.add(this.switchImage, this);
          
    },
    // We can update the state of the created objects
    update: function(){},
    switchImage: function(sprite,event){
        
        if(sprite.customParams.direction > 0){
            // We go Right
            console.log('right');
        }else{
            // We go Left
            console.log('left');
        }
    }
};

// Set the canvas or the webGL stage width, height, (auto detect: WebGL, Canvas, Headless)
var game = new Phaser.Game( stageWidth, stageHeight, Phaser.AUTO);
game.state.add( 'GalleryState',  GalleryState );
game.state.start( 'GalleryState' );



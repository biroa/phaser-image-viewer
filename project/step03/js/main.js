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
        // Load bitmap fonts
        this.game.load.bitmapFont('myfont', 'assets/fonts/font.png', 'assets/fonts/font.fnt');        
        
        // Load bitmap fonts
        //this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        
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
        
        var self = this, image;        
        
        // the loop comes here
        galleryData.forEach(function(element){
            image = self.gallery.create(-1000,self.game.world.centerY, element.key);
            image.anchor.setTo(0.5);
            image.scale.setTo(0.5);
            image.customParams = {
                text:element.key,
                title:element.title,
                desc:element.desc,
                info:element.info,
                default: true
            };

          //enable input so we can touch it
          image.inputEnabled = true;
          image.input.pixelPerfectClick = true;
          image.events.onInputDown.add(self.animateImage, self);
        }); 
        
        this.currentImage = this.gallery.next();
        this.currentImage.position.set(this.game.world.centerX, this.game.world.centerY);
        
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
    update: function(){                
    },
    
    switchImage: function(sprite, event){
        var newImage, endX;
                
        //if an animation is taking place don't do anything
        if(this.isMoving || !isImage.up) {
          return false;
        }

        this.isMoving = true;
        
        
        if(sprite.customParams.direction > 0){
            // We go Right =>
            
            // Assign the next image to the newImage variable
            newImage = this.gallery.next(); 
            // The newImage x position will be a negative number which outside of the visible area
            // First quadrant of the coordinates
            newImage.x = -newImage.width/2;
            // Assign the satgeWidth and the image.width/2 to the endX variable.
            // It is a positive number outside the visible area.
            // Second quadrant of the coordinates
            endX = stageWidth + this.currentImage.width/2;
        }else{
            // We go Left <=
            
            // Assign the next image to the newImage variable
            newImage = this.gallery.previous();
            // The newImage x position will be a positive number which outside of the visible area
            // Second quadrant of the coordinates
            newImage.x = stageWidth + newImage.width/2;
            // Assign the image.width/2 to the endX variable.
            // It is a negative number outside the visible area.
            // First quadrant of the coordinates
            endX = -this.currentImage.width/2;
        }
        
        //Assign the newImage tween object to the newImageMovement variable
        var newImageMovement = this.game.add.tween(newImage);
        // Move the newImage to the center of the stage with the specified milliseconds
        newImageMovement.to({ x: this.game.world.centerX }, 1000);
        // If the animation is completed we allow a new click otherwise function returns false ... in line 132 
        newImageMovement.onComplete.add(function(){this.isMoving = false;}, this);
        // apply the tween movement
        newImageMovement.start();

        //Assign the currentImage tween object to the currentImageMovement variable
        var currentImageMovement = this.game.add.tween(this.currentImage);
        // Move the currentImage to the center of the stage with the specified milliseconds
        currentImageMovement.to({ x: endX }, 1000);
        // apply the tween movement
        currentImageMovement.start();

        this.currentImage = newImage;
        
    },
    animateImage: function(card, event) {
        var cardMovement;
    
        if(!card.customParams.default){
                // Show the front side of the card
                card.customParams.default = true;
            
                cardMovement = this.add.tween(card.scale);
                cardMovement.to({ x: 0.5}, 1000, Phaser.Easing.Back.Out, true, 1000);
                cardMovement.onComplete.add(function(){
                    card.tint = 0xFFFFFF;
                    this.removeText();
                    isImage.up = true;
                }, this);
                cardMovement.start();
            
            }else{
                // Show the back side of the card
                card.customParams.default = false;            
                cardMovement = this.add.tween(card.scale);
                cardMovement.to({ x: -0.5}, 1000, Phaser.Easing.Back.In, true, 1000); 
                cardMovement.onComplete.add(function(){                    
                    card.tint = 0x45422f;
                    this.showText(card);
                    isImage.up = false;
                }, this);
                cardMovement.start();
            }
        
            console.log(card.customParams.default);
        
    },
    showText: function(card) {
        let paddingTop = 15;
        let top = Math.round((this.game.height - card.height) / 2) + paddingTop;
        this.imageText = '' ;
        
        if(!this.imageText){
            var style = {
                font: 'bold 15pt Patua One',
                fill: '#eba508',
                align: 'center'
            };
            //this.imageText = this.game.add.text(this.game.width/2, top, '', style);
            //this.imageText.anchor.x =0.5;
            
            // Set a Bitmap image
            this.imageText = this.game.add.bitmapText(this.game.width/2, top, 'myfont', '0', 20); 
            
        }
        
        this.imageText.setText(card.customParams.title);
        this.imageText.visible = true;
    },
    removeText(){
        this.imageText.destroy();
    }
};

var isImage = {up:true};
// Set the canvas or the webGL stage width, height, (auto detect: WebGL, Canvas, Headless)
var game = new Phaser.Game( stageWidth, stageHeight, Phaser.AUTO,'game',null, false, false);
game.state.add( 'GalleryState',  GalleryState );
game.state.start( 'GalleryState' );

////  The Google WebFont Loader will look for this object, so create it before loading the script.
//WebFontConfig = {
//
//    //  'active' means all requested fonts have finished loading
//    //  We set a 1 second delay before calling 'createText'.
//    //  For some reason if we don't the browser cannot render the text the first time it's created.
//   // active: function() { game.time.events.add(Phaser.Timer.SECOND, '', this); },
//
//    //  The Google Fonts we want to load (specify as many as you like in the array)
//    google: {
//      families: ['Patua One']
//    }
//
//};

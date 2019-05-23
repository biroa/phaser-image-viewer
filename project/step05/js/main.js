// HELP: 
// http://jsbin.com/phaserXMLDialog/1/edit?html,js,console,output

// Future functionalities:
    // Below the image details (iso, shutter-spped stc ... load google map with the specified lat,lng)
    
    // Load the data from xml. This way the user can specify the new images, and parameters ...

// Example: 
// https://labs.phaser.io/index.html
// Default path of the background(s)
var path = 'assets/images/';
// Set the size of the Stage
var stageWidth  = 800;
var stageHeight = 450;
var imageScope;

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
        // load the arrow
        this.load.image('arrow', path + 'arrow2.png');
        // load the icons
        this.load.image('aperture', path + '/icons/aperture.png');
        this.load.image('camera', path + '/icons/camera.png');
        this.load.image('gps', path + '/icons/gps.png');
        this.load.image('iso', path + '/icons/iso.png');
        this.load.image('lens', path + '/icons/lens-spec.png');
        this.load.image('shutter', path + '/icons/shutter-speed.png');
        
        this.load.image('p1', gPath + 'punk-band.jpg');
        this.load.image('p2', gPath + 'punk-portrait.jpg');
        this.load.image('p3', gPath + 'punk-portrait2.jpg');
    },
    // We can init the preloaded data in the section
    create: function(){
        
        imageScope = this;
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
            {
                key:'p1', 
                title:'Test Image 1',
                desc:'The desc 1 comes here',
                iso:'iso 400',
                aperture:'F / 8',
                shutter: '1 / 250',
                lens: '28-80mm',
                camera: 'Canon EOS 40D',
                gps: '40.7127281, -74.0060152',
            },
            {
                key:'p2',
                title:'Test Image 2',
                desc:'The desc 2 comes here',
                iso:'iso 400',
                aperture:'F / 5.6',
                shutter: '1 / 500',
                lens: '28-80mm',
                camera: 'Canon EOS 40D',
                gps: '40.7127281, -74.0060152',
            },
            {
                key:'p3',
                title:'Test Image 3',
                desc:'The desc 3 comes here',
                iso:'iso 200',
                aperture:'F / 2.8',
                shutter: '1 / 1000',
                lens: '28-80mm',
                camera: 'Canon EOS 40D',
                gps: '40.7127281, -74.0060152',
            }
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
            image.var 
            image.customParams = {
                text:element.key,
                title:element.title,
                desc:element.desc,
                iso:element.iso,
                aperture:element.aperture,
                shutter: element.shutter,
                lens: element.lens,
                camera: element.camera,
                gps: element.gps,
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
                cardAlpha = this.add.tween(card);
                cardAlpha.to( { alpha: 1 }, 2000, Phaser.Easing.Linear.easeOut, true, 0);
                cardAlpha.start();
                cardMovement = this.add.tween(card.scale);
                cardMovement.to({ x: 0.5}, 1000, Phaser.Easing.Back.Out, true, 1000);
                cardMovement.onComplete.add(function(){
                    card.tint = 0xFFFFFF;
                    this.removeText();
                    isImage.up = true;
                    imageScope.rightArrow.visible = true;
                    imageScope.leftArrow.visible = true;
                }, this);
                cardMovement.start();
            
            }else{
                // Show the back side of the card
                card.customParams.default = false;            
                cardMovement = this.add.tween(card.scale);
                cardMovement.to({ x: -0.5}, 1000, Phaser.Easing.Back.In, true, 1000); 
                cardMovement.onComplete.add(function(){                    
                    card.tint = 0x000000;
                    this.showText(card);
                    isImage.up = false;
                    imageScope.leftArrow.visible = false;
                    imageScope.rightArrow.visible = false;
                }, this);                
                cardMovement.start();
                cardAlpha = this.add.tween(card);
                cardAlpha.to( { alpha: 0.8 }, 2000, Phaser.Easing.Linear.easeOut, true, 0);
                cardAlpha.start();
            }
        
            console.log(card.customParams.default);
        
    },
    showText: function(card) {
        let paddingTop = 15;
        let paddingSides = 15;
        let top = Math.round((this.game.height - card.height) / 2) + paddingTop;
        let leftBeggining  = Math.round( (this.game.width - Math.abs(card.width)) / 2) + paddingSides;
        let rightBeggining = this.game.world.centerX + paddingSides;
        this.imageTitle = '' ;
            
        // Just offset with half a pixel, and it’ll render nice and sharp. This works, because in SVG and in Canvas, pixels aren’t seen as an indivisible unit. You can draw on a part of a pixel
        // => http://www.html5gamedevs.com/topic/14904-blurry-text/
        if(!this.imageTitle){
            var style = {
                font: 'bold 15.5px Arial',
                fill: '#ffffff',
                align: 'center'
            };
            this.imageTitle = this.game.add.text(this.game.width/2, top, '', style);            
            this.imageTitle.anchor.x =0.5;
            this.imageTitle.setText(card.customParams.title);
            this.imageTitle.visible = true;
            // iso,gps,aperture,shutter,lens,camera
            var style2 = {
                font: '13.5px Arial',
                fill: '#ffffff',
                align: 'center'
            };
            
            this.iso = this.game.add.text(leftBeggining, top + ( paddingTop * 2 ), '', style2);
            this.iso.setText(card.customParams.iso);
            this.iso.visible = true;

            this.aperture = this.game.add.text(leftBeggining, top + 2 * ( paddingTop * 2 ), '', style2);
            this.aperture.setText(card.customParams.aperture);
            this.aperture.visible = true;
            
            this.shutter = this.game.add.text(leftBeggining, top + 3 * ( paddingTop * 2 ), '', style2);
            this.shutter.setText(card.customParams.shutter);
            this.shutter.visible = true;
            
            
            if(Math.abs(card.width) > Math.abs(card.height)){
                // when the image has a horizontal format
                this.lens = this.game.add.text(rightBeggining, top + ( paddingTop * 2 ), '', style2);
                this.camera = this.game.add.text(rightBeggining, top + 2 * ( paddingTop * 2 ), '', style2);
                this.gps = this.game.add.text(rightBeggining, top + 3 * ( paddingTop * 2 ), '', style2);               
            }else{
                // when the image has a vertical format
                this.lens = this.game.add.text(leftBeggining, top + 4* ( paddingTop * 2 ), '', style2);
                this.camera = this.game.add.text(leftBeggining, top + 5 * ( paddingTop * 2 ), '', style2);
                this.gps = this.game.add.text(leftBeggining, top + 6 * ( paddingTop * 2 ), '', style2);
            }
                                
            
            this.lens.setText(card.customParams.lens);
            this.lens.visible = true;
            
            
            this.camera.setText(card.customParams.camera);
            this.camera.visible = true;
            
        
            this.gps.setText(card.customParams.gps);
            this.gps.visible = true;
            
            // I do not have proper iconset .... :(
//            let gps = this.game.add.sprite(this.game.width/2, top + 40, 'gps');
//            gps.anchor.setTo(0.5);
//            gps.scale.setTo(0.4);
        }
        
    },
    removeText(){
        this.imageTitle.destroy();
        this.iso.destroy();
        this.aperture.destroy();
        this.shutter.destroy();
        this.lens.destroy();
        this.camera.destroy();
        this.gps.destroy();
    }
};

var isImage = {up:true};
// Set the canvas or the webGL stage width, height, (auto detect: WebGL, Canvas, Headless)
var game = new Phaser.Game( stageWidth, stageHeight, Phaser.AUTO,'game',null, false, false);
game.state.add( 'GalleryState',  GalleryState );
game.state.start( 'GalleryState' );

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Phaser */

//Phaser.Game((window.innerWidth*2), (window.innerHeight*2)
var Main = new Phaser.Game(window.screen.width,window.screen.height,Phaser.CANVAS,'canvas',
{preload: preload, update: update, create: create });

    var width = window.innerWidth;
    var height = window.innerHeight;
    var scaleRatio = window.devicePixelRatio/3;
        
    function preload()
    {
        //Preload Images
        this.load.image('robot','Image/robot.jpeg');
        this.load.image('title','Image/title.png');
        this.load.image('title2','Image/title2.png');
        this.load.image('rightarr','Image/rightarrow.png');
        this.load.image('leftarr','Image/leftarrow.png');
        this.load.image('startbutt','Image/playbutton.png');
        this.load.spritesheet('rain','Image/rain.png',17,17);
        
        
        //Preload Sounds
        this.load.audio('freeze','Sound/freeze.mp3');
        
        this.state.start(this);
        //makes a new state or level for the game
        Main.state.add('level1',level);
        Main.state.add('help1',help);
        
       
        
        this.stage.smoothed = true;
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;   
        this.scale.scaleMode.forceLandscape = true;
        this.scale.pageAlignVertically = true;
        this.scale.pageAlignHorizontally = true;
        this.scale.refresh();
        
        
        

        
        
}
    
    var background_image;
    var title1_image;
    var title2_image;
    var startbutton;

    
    function create()
    {   
        
    
        background_image = Main.add.image(0,0,'robot');
        background_image.anchor.setTo(0.01,0.01);
        background_image.height = window.screen.availHeight+50;
        background_image.width = window.screen.availWidth+25;
        
        
        fx = Main.add.audio('freeze');
       
        //background_image.height = Main.height;
        //background_image.width = Main.width;
        
        Main.stage.backgroundColor = "#4488AA";
        
        var emitter = Main.add.emitter(Main.world.centerX,0,400);
        
        emitter.width = Main.world.width;
        emitter.makeParticles('rain');
        
        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 0.5;
        
        emitter.setYSpeed(300,500);
        emitter.setXSpeed(-5,5);
        
        emitter.minRotation = 0;
        emitter.maxRotation = 0;
        
        emitter.start(false, 1600, 5, 0);
        
        
        
        
        title1_image = Main.add.image(Main.world.centerX-200,Main.world.centerY-330,'title');
        title1_image.alpha = 0;
        title1_image.anchor.setTo(0.1,0.1);
        //title1_image.scale.setTo(scaleRatio,scaleRatio);
        
        //tween the first title
        Main.add.tween(title1_image).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 
        0, 100, true); 
        
        title2_image = Main.add.image(Main.world.centerX-180,Main.world.centerY-220,'title2')
        //title2_image.scale.setTo(scaleRatio,scaleRatio);
        title2_image.anchor.setTo(0.1,0.1);
        
        
     
        //start button
        startbutton = Main.add.button(Main.world.centerX,Main.world.centerY-120,
        'startbutt', actionOnClick,this,0,0,0);
        //startbutton.scale.setTo(scaleRatio,scaleRatio);
        
        fx.play();
        fx.volume = 0.5;
        
        //this centers the button
        startbutton.anchor.setTo(0.5,0.5);
        
        
        
        startbutton.onInputOver.add(over,this);
        startbutton.onInputOut.add(out,this);

        

      
        Main.add.tween(startbutton).to({y:560},2400, Phaser.Easing.Bounce.Out, true);

        //Left and right button
        //right_image = game.add.image(game.world.centerX+650,game.world.centerY-330,'rightarr');
        //left_image = game.add.image(game.world.centerX-650,game.world.centerY-330,'leftarr');
    }
    
    function update()
    {
        
    }
    
    function over()
    {
        //tween button
        Main.add.tween(startbutton.scale).to({x: 1.2, y: 1.2}, 500, Phaser.Easing.Back.Out,
        true);
    }
    
    function out()
    {
        //go back to normal
        Main.add.tween(startbutton.scale).to({x: 1, y: 1}, 500, Phaser.Easing.Back.In,
        true);
    }
    function actionOnClick()
    {
        //goto the js file
        //Main.state.start('level1');
        Main.state.start('help1');
    }



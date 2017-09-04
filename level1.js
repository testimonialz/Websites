/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//this is the state name that is used here
var level = ({preload: preload, update: update, create: create});
            
      

        //Preload Images
    function preload()
    {
        
        level.load.image('tech','Image/futuretech.jpg');
        level.load.image('bullet', 'Image/bullet.png');
        level.load.image('enemyBullet', 'Image/enemy-bullet.png');
        level.load.spritesheet('invader', 'Image/invader32x32x4.png', 32, 32);
        level.load.image('ship', 'Image/player.png');
        level.load.spritesheet('kaboom', 'Image/explode.png', 128, 128);
        level.load.image('starfield', 'Image/starfield.png');
        level.load.image('background', 'Image/background2.png');
        level.load.image('buttonright', 'Image/rightarrow1.png');
        level.load.image('buttonleft','Image/leftarrow1.png');
        level.load.image('projection','Image/glass.png');
    //Preload Sounds
        this.load.audio('laser','Sound/laser.mp3');
        this.load.audio('explosion','Sound/Explosion.wav');
        this.load.audio('hurt','Sound/hurt.mp3');
        this.load.audio('Space','Sound/spacesound.mp3');
        
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.stage.scale.pageAlignHorizaontally = true;
        this.stage.scale.pagelignVertically = true;
    }

var w = window.innerWidth;
var h = window.innerHeight;  
var player;
var aliens;
var bullets;
var bulletTime = 0;
var cursors;
var fireButton;
var fireButton2;
var rightButton;
var leftButton;
var explosions;
var starfield;
var score = 0;
var scoreString = '';
var scoreText;
var lives;
var enemyBullet;
var firingTimer = 0;
var stateText;
var infoText1,infoText2,infoText3,
infoText4,infoText5,infoText6,infoText7,
infoText8,infoText9;
var livingEnemies = [];
var clickright = false;
var clickleft = false;
var tween;
var projection;

function create() 
{

    level.physics.startSystem(Phaser.Physics.ARCADE);

    //  The scrolling starfield background
    starfield = level.add.tileSprite(0, 0,800 ,600 , 'starfield');
    starfield.width = Main.width;
    starfield.height = Main.height;
    
    
    //Sound for fx
    //remeber to change audio
    level.add.audio('laser',0,true);
    level.add.audio('explosion',0,true);
    level.add.audio('hurt',0,true);
    
    fx = level.add.audio('Space');
    fx.play();
    fx.volume = 0.8;

    //  Our bullet group
    bullets = level.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    // The enemy's bullets
    enemyBullets = level.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    //  The hero!
    player = level.add.sprite(level.world.centerX,level.world.centerY+300, 'ship');
    player.anchor.setTo(0.5, 0.5);
    level.physics.enable(player, Phaser.Physics.ARCADE);

    //  The baddies!
    aliens = level.add.group();
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;

    createAliens();

    //  The score
    scoreString = 'Score : ';
    scoreText = level.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

    //  Lives
    lives = level.add.group();
    level.add.text(level.world.width - 110, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

    //  Text for Game over
    stateText = level.add.text(level.world.centerX,level.world.centerY,' ', { font: '64px Arial', fill: '#00FFFF' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;
    stateText.alpha = 0;
    
    
    //GAME TEXT
    infoText1 = level.add.text(level.world.centerX,level.world.centerY,' ', { font: '64px Serif', fill: '#CCFFFF' });
    infoText1.anchor.setTo(0.5,0.5);
    infoText1.visible = false;
    
    infoText2 = level.add.text(level.world.centerX,level.world.centerY,' ', { font: '28px Serif', fill: '#fff' });
    infoText2.anchor.setTo(0.5,0.5);
    infoText2.visible = false;
    
    infoText3 = level.add.text(level.world.centerX,level.world.centerY,' ', { font: '28px Serif', fill: '#CCFFFF' });
    infoText3.anchor.setTo(0.5,0.5);
    infoText3.visible = false;
    
    infoText4 = level.add.text(level.world.centerX,level.world.centerY,' ', { font: '28px Serif', fill: '#fff' });
    infoText4.anchor.setTo(0.5,0.5);
    infoText4.visible = false;
    
    infoText5 = level.add.text(level.world.centerX,level.world.centerY,' ', { font: '28px Serif', fill: '#fff' });
    infoText5.anchor.setTo(0.5,0.5);
    infoText5.visible = false;
    
    infoText6 = level.add.text(level.world.centerX,level.world.centerY,' ', { font: '28px Serif', fill: '#CCFFFF' });
    infoText6.anchor.setTo(0.5,0.5);
    infoText6.visible = false;
    
    infoText7 = level.add.text(level.world.centerX,level.world.centerY,' ', { font: '28px Serif', fill: '#fff' });
    infoText7.anchor.setTo(0.5,0.5);
    infoText7.visible = false;
    
    infoText8 = level.add.text(level.world.centerX,level.world.centerY,' ', { font: '28px Serif', fill: '#CCFFFF' });
    infoText8.anchor.setTo(0.5,0.5);
    infoText8.visible = false;
    

    
    ////////////////
    
    for (var i = 0; i < 3; i++) 
    {
        var ship = lives.create(level.world.width - 100 + (30 * i), 60, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 90;
        ship.alpha = 0.4;
    }

    //  An explosion pool
    explosions = level.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setupInvader, this);

    //  And some controls to play the game with
    cursors = level.input.keyboard.createCursorKeys();
    fireButton = level.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    //This is for holding down the button for right button
    rightButton = level.add.button(level.world.width-200,level.world.height-186,'buttonright',actionOnrightClick,0,0,0,0);
    rightButton.scale.setTo(1.2,1.2);
    rightButton.onInputUp.add(onButtonUpright,this);
    rightButton.onInputDown.add(actionOnrightClick,this);
    
    
    //This is for holding down the button for the left button
    leftButton = level.add.button(50,level.world.height-186,'buttonleft',actionOnleftClick,0,0,0,0);
    leftButton.scale.setTo(1.2,1.2);
    leftButton.onInputUp.add(onButtonUpleft,this);
    leftButton.onInputDown.add(actionOnleftClick,this);
    
     cursors = level.input.keyboard.createCursorKeys();
    // once the level has been created, we wait for the player to touch or click, then we call
    // beginSwipe function	
    
    
    
}

function createAliens () {

    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            var alien = aliens.create(x * 100, y * 60, 'invader');
            alien.anchor.setTo(0.5, 0.5);
            alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
            alien.play('fly');
            alien.body.moves = false;
        }
    }

    aliens.x = 300;
    aliens.y = 50;

    //First check if game isnt paused
 
        //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
        tween = level.add.tween(aliens).to( { x: 560 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        //  When the tween loops it calls descend
        tween.onLoop.add(descend, this);
       
  
}

function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

}

function descend() {

    aliens.y += 10;

}

function update() {

    //  Scroll the background
    starfield.tilePosition.y += 2;
    
    //First check if game isnt paused
    if(!level.physics.arcade.isPaused)
    {

        if (player.alive)
        {
            //  Reset the player, then check for movement keys
            player.body.velocity.setTo(0, 0);


            //THIS IS FOR MOBILE WHEN GOING RIGHT AND LEFT
            if (cursors.left.isDown || clickleft ===true)
            {
                player.body.velocity.x = -200;
            }

            else if (cursors.right.isDown || clickright===true)
            {
                player.body.velocity.x = 200;
            }
            else
                player.body.velocity.x = 0;






            //  Firing?
            //This code is for when the button is completely pressed by spacebar

            fireButton.onDown.add(fireBullet,this);  



            //This code is for when you tap you fire your bullet
             level.input.onTap.add(fireBullet,this);



            if (level.time.now > firingTimer)
            {
                enemyFires();
            }

            //  Run collision
            level.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
            level.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
        }
    }
}

function render() {

    // for (var i = 0; i < aliens.length; i++)
    // {
    //     level.debug.body(aliens.children[i]);
    // }

}

function collisionHandler (bullet, alien) {

    //  When a bullet hits an alien we kill them both
    bullet.kill();
    alien.kill();

    //  Increase the score
    score += 10;
    scoreText.text = scoreString + score;

    //  And create an explosion :)
    level.sound.play('explosion');
    
    var explosion = explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('kaboom', 30, false, true);
    
    //When there are no more enemies
    if (aliens.countLiving() == 0)
    {
        score += 1000;
        scoreText.text = scoreString + score;

        enemyBullets.callAll('kill',this);
        stateText.text = "HORRAY!! YOU'VE WON!!\n\ Click to restart!";
        level.add.tween(stateText).to({alpha: 1}, 1600, Phaser.Easing.Linear.None, true, 
        0, 100, true); 
        stateText.visible = true;
        
        //Blinks When you win
        level.add.tween(stateText).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 
        0, 100, true); 
        
        //the "click to restart" handler
        level.input.onTap.addOnce(restart,this);
    }
    
    if(score === 50) //this checks if the number of enimes is a multiple of 10
    {
       /* infoText1.text = "Here are some Computer Science \n\Tips and advice to think about,\n\while you try to enjoy the game and\n\ try to get a high Score!";
        infoText1.visible = true;
        infoText1.fontWeight = 'bold';
        projection = level.add.sprite(level.world.centerX,level.world.centerY, 'projection');
        projection.anchor.setTo(0.5, 0.5);
        projection.scale.setTo(11,6);
        
        //PAUSE THE GAME
        level.physics.arcade.isPaused = true;
        tween.pause();
        
        //THIS is a timer used to unpause the game
        //level.time.events.add(Phaser.Timer.SECOND*6,UnPause, this);
        
        //once you tap here you unpause
        level.input.onTap.addOnce(UnPause);
    
        //I changed the Firebutton in this context to unpause as a posed to firing
        fireButton.onDown.add(UnPause); 
        
        */
        
     }
     if(score === 100)
     {
       /* infoText2.text = "Math is all over Computer Science in many different ways.\n\
\n\Software Engineers will use discrete math when working out\n\
algorithm complexity and efficiency in graph theory, and recursion.\n\
People who work more directly with hardware will use discrete math in \n\
designing logical circuits and use automata theory for making finite \n\
state machines. \n\
\n\At that level you are also working with the large amount\n\
of math inherent with electrical engineering.In research aspects you will\n\
be using probability and statistics for performance measurements \n\
and comparisons. Even game programmers use a lot of math when\n\
creating 3D environments. ";
        infoText2.fontWeight = 'bold';
        infoText2.visible = true;
        projection = level.add.sprite(level.world.centerX,level.world.centerY, 'projection');
        projection.anchor.setTo(0.5, 0.5);
        projection.scale.setTo(11,6);
        
        //PAUSE THE GAME
        level.physics.arcade.isPaused = true;
        tween.pause();
        
        //once you tap here you unpause
        level.input.onTap.addOnce(UnPause);
        
        //I changed the Firebutton in this context to unpause as a posed to firing
        fireButton.onDown.add(UnPause); 
        
        */
     }
    
    if(score === 150)
    {
        
        /*
        infoText3.text = "Don't Procrastinate \n\
\n\We know you've heard it a million times, \n\
but this is the worst possible thing you can do in a programming class. \n\
When you get an assignment, look it over and start on it right away. \n\
In the likely chance that you can't work through an error or figure out the logic, \n\
you'll have time to contact your instructor or use other available resources to solve \n\
the problem. ";
        infoText3.fontWeight = 'bold';
        infoText3.visible = true;
        projection = level.add.sprite(level.world.centerX,level.world.centerY, 'projection');
        projection.anchor.setTo(0.5, 0.5);
        projection.scale.setTo(11,6);
        
        //PAUSE THE GAME
        level.physics.arcade.isPaused = true;
        tween.pause();
        
        //once you tap here you unpause
        level.input.onTap.addOnce(UnPause);
        
        //I changed the Firebutton in this context to unpause as a posed to firing
        fireButton.onDown.add(UnPause); 
        
        */
    }
    
    if(score === 200)
    {
        /*
        infoText4.text = "Don't Overcomplicate\n\
\n\Things The smaller a block of code is, without being redundant of other code, \n\
the better. When you break down algorithms which have nothing in common, \n\
often there is a loop or operation which is not unique, other than the parameters\n\
involved. A single method/function should not be longer, or wider than a \n\
standard 800x600 monitor view. If you comment well, a little larger is acceptable.";
        infoText4.fontWeight = 'bold';
        infoText4.visible = true;
        projection = level.add.sprite(level.world.centerX,level.world.centerY, 'projection');
        projection.anchor.setTo(0.5, 0.5);
        projection.scale.setTo(11,6);
        
        //PAUSE THE GAME
        level.physics.arcade.isPaused = true;
        tween.pause();
        
        //ADDING TIMER SO YOU Cant press anything untiol the time is up
        
        
        //once you tap here you unpause
        level.input.onTap.addOnce(UnPause);
        
        
        //I changed the Firebutton in this context to unpause as a posed to firing
        fireButton.onDown.add(UnPause); 
        
        */
      }
    if(score === 250)
     {
         
         /*
        infoText5.text = "Impress Your Instructors, But Not Too Much :)\n\
\n\Your instructor can be your best friend, but don't be a suck up.\n\
Ask questions and show your instructor you're interested but \n\
don't annoy the rest of the class with constant questions and meaningless \n\
comments. If you can get to know your instructor, you may be able to leverage \n\
that relationship in the future for internships and recommendations.";
        infoText5.fontWeight = 'bold';
        infoText5.visible = true;
        projection = level.add.sprite(level.world.centerX,level.world.centerY, 'projection');
        projection.anchor.setTo(0.5, 0.5);
        projection.scale.setTo(11,6);
        
        //PAUSE THE GAME
        level.physics.arcade.isPaused = true;
        tween.pause();
        
        //once you tap here you unpause
        level.input.onTap.addOnce(UnPause);
        
        //I changed the Firebutton in this context to unpause as a posed to firing
        fireButton.onDown.add(UnPause); 
        
        */
      }

     if(score === 300)
     {
         
         /*
       infoText6.text = "Use All Your Resources\n\
\n\Don't hit a road block and then panic. There are \n\
thousands of resources online to help you work through \n\
a problem. From tutorials, to forums , to live help, you \n\
should be able to find the help you need. Just remember it \n\
can take more than a few minutes for someone to help solve \n\
your problem so don't wait till the last minute. \n\
Google is definitley your friend and don't feel embarassed \n\
if you have to search for your problem. Don't expect people to \n\
do the work for you though, you'll still have to put forth some effort."
        infoText6.fontWeight = 'bold';
        infoText6.visible = true;
        projection = level.add.sprite(level.world.centerX,level.world.centerY, 'projection');
        projection.anchor.setTo(0.5, 0.5);
        projection.scale.setTo(11,6);
        
        //PAUSE THE GAME
        level.physics.arcade.isPaused = true;
        tween.pause();
        
        //once you tap here you unpause
        level.input.onTap.addOnce(UnPause);
        
        //I changed the Firebutton in this context to unpause as a posed to firing
        fireButton.onDown.add(UnPause); 
        
        */
      }
    
     if(score === 350)
     {
         /*
        infoText7.text = "Make Sure This is What You Want to Do\n\
\n\Many computer science students get into CS because they like games. \n\
Now there are a lot of positions in Computer Game Design that do not \n\
require you to be a programmer, so if you are not interested in the \n\
coding aspect talk to someone who might direct you to a better path. \n\
Areas such as Technical writing, Dramatic Writing, graphic arts, \n\
business management, and many more might be better places to go. \n\
Use your minor/electives to take computer oriented classes and get \n\
to know the CS majors."
        infoText7.visible = true;
        projection = level.add.sprite(level.world.centerX,level.world.centerY, 'projection');
        projection.anchor.setTo(0.5, 0.5);
        projection.scale.setTo(11,6);
        
        //PAUSE THE GAME
        level.physics.arcade.isPaused = true;
        tween.pause();
        
        //once you tap here you unpause
        level.input.onTap.addOnce(UnPause);
        
        //I changed the Firebutton in this context to unpause as a posed to firing
        fireButton.onDown.add(UnPause); 
        
        */
      } 
    
  
}

function enemyHitsPlayer (player,bullet) {
    
    bullet.kill();

    live = lives.getFirstAlive();

    if (live)
    {
        live.kill();
    }

    //  And create an explosion :)
    level.sound.play('hurt');
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    // When the player dies
    if (lives.countLiving() < 1)
    {
        player.kill();
        enemyBullets.callAll('kill');

        stateText.text=" GAME OVER! \n Click to restart";
        stateText.visible = true;
        
        //Blinks when GameOver
        level.add.tween(stateText).to({alpha: 1}, 1600, Phaser.Easing.Linear.None, true, 
        0, 100, true); 
        //the "click to restart" handler
        level.input.onTap.addOnce(restart,this);
    }

}

function enemyFires () {

    //First check if game is not paused
    if(!level.physics.arcade.isPaused)
    {
        //  Grab the first bullet we can from the pool
        enemyBullet = enemyBullets.getFirstExists(false);

        livingEnemies.length=0;

        aliens.forEachAlive(function(alien){

            // put every living enemy in an array
            livingEnemies.push(alien);
        });


        if (enemyBullet && livingEnemies.length > 0)
        {

            var random=level.rnd.integerInRange(0,livingEnemies.length-1);

            // randomly select one of them
            var shooter=livingEnemies[random];
            // And fire the bullet from this enemy
            enemyBullet.reset(shooter.body.x, shooter.body.y);

            //Firing Speed
            level.physics.arcade.moveToObject(enemyBullet,player,280);

            //firing timer
            firingTimer = level.time.now + 700;
        }
    }
}

function fireBullet () {

    //First check if game isnt paused
    if(!level.physics.arcade.isPaused)
    {
        //  To avoid them being allowed to fire too fast we set a time limit
        if (level.time.now > bulletTime)
        {
            //  Grab the first bullet we can from the pool
            bullet = bullets.getFirstExists(false);

            if (bullet)
            {
                //  And fire it
                level.sound.play('laser');
                bullet.reset(player.x, player.y + 8);
                bullet.body.velocity.y = -400;
                bulletTime = level.time.now + 200;
            }
        }
    }
}

function resetBullet (bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

}

function restart () {

    //  A new level starts
    
    //resets the life count
    lives.callAll('revive');
    //  And brings the aliens back from the dead :)
    aliens.removeAll();
    createAliens();

    //scoscoreString = 'Score : ';
    scoreText.text = scoreString + 0;
    score = 0;

    //revives the player
    player.revive();
    //hides the text
    stateText.visible = false;

}


function actionOnrightClick()
{
    //button scaled
    level.add.tween(rightButton.scale).to({x: 1.2, y: 1.2}, 500, Phaser.Easing.Back.Out,
    true)
    clickright = true;
}
function onButtonUpright()
{
    //button back to normal
    level.add.tween(rightButton.scale).to({x: 1, y: 1}, 500, Phaser.Easing.Back.In,
    true);
    clickright = false;
}
function actionOnleftClick()
{
    //button scaled
    level.add.tween(leftButton.scale).to({x: 1.2, y: 1.2}, 500, Phaser.Easing.Back.Out,
    true)
    clickleft = true;
    
}
function onButtonUpleft()
{
    //button back to normal
    level.add.tween(leftButton.scale).to({x: 1, y: 1}, 500, Phaser.Easing.Back.In,
    true);
    clickleft = false;
}

function UnPause()
{
    level.physics.arcade.isPaused = false;
    tween.resume();
    
    //Destroy sprite
    projection.destroy();
    
    infoText1.visible = false;
    infoText2.visible = false;
    infoText3.visible = false;
    infoText4.visible = false;
    infoText5.visible = false;
    infoText6.visible = false;
    infoText7.visible = false;
    infoText8.visible = false;

    
    
    
}
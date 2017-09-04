/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//this is the state name that is used here
var help = ({preload: preload, update: update, create: create});
 
    function preload()
    {

        help.load.image('buttonleft','Image/leftarrow1.png');
        help.load.image('play','Image/play.png');

        
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        //this.stage.scale.pageAlignHorizaontally = true;
        //this.stage.scale.pagelignVertically = true;
        
        this.state.start(this);
        
    }
    
    var StringText;
    var StringText2;
    var StringText3;
    var Playbutton;
    
    
    
    function create()
    {
        help.stage.backgroundColor = "#fff";
        StringText = help.add.text(help.world.centerX-200,help.world.centerY-380,'HELP MENU ', { font: '84px Arial', fill: '#0892d0' });
        StringText.alpha = 0;
        StringText2 = help.add.text(help.world.centerX-500,help.world.centerY-200,'To play this game, you must follow these\n\simple instructions,\ if you are on a computer\n\ use the arrow keys "LEFT" and "RIGHT"\n\for movement,and "SPACE" to fire your guns\n\if you are on a Mobile device use\n\
the Touch Controls and Tap the Screen to Fire\n\
and **also please try to play the game at a *SLOW* pace!', 
        { font: '42px Arial', fill: '#900000' });
        
        
        help.add.tween(StringText).to({alpha: 1}, 1400, Phaser.Easing.Linear.None, true, 
        0, 100, true); 
        
        Playbutton = help.add.button(help.world.centerX,help.world.centerY+240,
        'play', actionClick,this,0,0,0);
        Playbutton.scale.setTo(1.5,1.5);
        Playbutton.anchor.setTo(0.5,0.5);
       
        
        StringText3 = help.add.text(help.world.centerX-280,help.world.centerY+260,'Touch here to start --> ', 
        { font: '38px TimesnewRoman', fill: '#0892d0' });
        StringText3.anchor.setTo(0.5,0.5);

        help.add.tween(Playbutton).to({angle:'+360'}, 1200, Phaser.Easing.Linear.None, true).loop(true);
        
        
    }
    
    function update()
    {
        
    }
    
    function actionClick()
    {
        help.state.start('level1');
    }
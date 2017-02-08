//------------
//System Vars
//------------

var stage = document.getElementById("gameCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
ctx.fillStyle = "white";
ctx.font = GAME_FONTS;

window.addEventListener('keydown',onKeyDown,true);
window.addEventListener('keyup',onKeyUp,true);

//---------------
//Preloading ...
//---------------
//Preload Art Assets
// - Sprite Sheet: Image API:
// http://www.html5canvastutorials.com/tutorials/html5-canvas-images/

var logoImage = new Image();
logoImage.ready = false;
logoImage.onload = setAssetReady;
logoImage.src = PATH_LOGO;  // source image location set in constants.js

var xtremeImage = new Image();
xtremeImage.ready = false;
xtremeImage.onload = setAssetReady;
xtremeImage.src = PATH_XTREME;  // source image location set in constants.js

var charImage = new Image();
charImage.ready = false;
charImage.onload = setAssetReady;
charImage.src = PATH_CHAR;  // source image location set in constants.js

var redImage = new Image();
redImage.ready = false;
redImage.onload = setAssetReady;
redImage.src = PATH_RED;  // source image location set in constants.js

var blueImage = new Image();
blueImage.ready = false;
blueImage.onload = setAssetReady;
blueImage.src = PATH_BLUE;  // source image location set in constants.js

var orangeImage = new Image();
orangeImage.ready = false;
orangeImage.onload = setAssetReady;
orangeImage.src = PATH_ORANGE;  // source image location set in constants.js

var pinkImage = new Image();
pinkImage.ready = false;
pinkImage.onload = setAssetReady;
pinkImage.src = PATH_PINK;  // source image location set in constants.js

var scoreImage = new Image();
scoreImage.ready = false;
scoreImage.onload = setAssetReady;
scoreImage.src = PATH_SCORE;  // source image location set in constants.js



function setAssetReady()
{
	this.ready = true;
}

//Display Preloading
ctx.fillRect(0,0,stage.width,stage.height);
ctx.fillStyle = "#000";
ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);
var preloader = setInterval(preloading, TIME_PER_FRAME);
var gameloop,currX,currY

function preloading()
{	
    c++;
        ctx.fillStyle = "#000";
    ctx.fillRect(0,0,stage.width,stage.height);
        ctx.drawImage(logoImage,0,0);
        ctx.drawImage(xtremeImage,128,70);
        ctx.fillStyle = "white";
        ctx.fillText("Arrow Keys Move", 60,150);
        ctx.fillText("Space Shoots", 80,180);
	if (charImage.ready && redImage.ready && 
        blueImage.ready && orangeImage.ready && 
        pinkImage.ready && scoreImage.ready &&
        c == 100)
	{
		clearInterval(preloader);
        
        gameloop = setInterval(update, TIME_PER_FRAME);
	}
    
}

//------------
//Game Loop
//------------
//currX, currY is a reference to  the image in sprite sheet

    currX = Pacman.IMAGE_START_X;
    currY = Pacman.IMAGE_START_Y;
function shoot(){
    shot = true;
    bulletx = Pacman.CHAR_START_X + 6;
    bullety = Pacman.CHAR_START_Y + 6;
    bulletdx = 0;
    bulletdy = 0;
    if(Pacman.rotation == 0)
        bulletdx = 6;
        //bulletdy = 0;
    if(Pacman.rotation == 32)
        bulletdy = -6;
        //bulletdx = 0;
    if(Pacman.rotation == 64)
        bulletdx = -6;
       //bulletdy = 0;
    if(Pacman.rotation == 96)
        bulletdy =  6;
        //bulletdx = 0;
}
function onKeyDown(evt){
    switch (evt.keyCode) 
		{
            case 87:
            case 38:  /* WUp arrow was pressed */
                up = true;
                break;
            case 83:
            case 40:  /* SDown arrow was pressed */
                down = true;
                break;
            case 65:
            case 37:  /* ALeft arrow was pressed */
                left = true;
                break;
            case 68:
            case 39:  /* DRight arrow was pressed */
                right = true;
                break;
            case 32:
                shoot();
                start = true;
                break;
			} // end switch
}
function onKeyUp(evt){
    switch (evt.keyCode) 
		{
            case 87:
            case 38:  /* WUp arrow was released */    
                up = false;
                break;
            case 83:
            case 40:  /* SDown arrow was released */
                down = false;
                break;
            case 65:
            case 37:  /* ALeft arrow was released */
                left = false;
                break;
            case 68:
            case 39:  /* DRight arrow was released */
                right = false;
                break;
			} // end switch
}

function update()
{		
    if(!gameover){

    //Clear Canvas
    //ctx.drawImage(boardImage,0,0);
	//Draw Image'
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, stage.width, stage.height);
    
    ctx.fillStyle = "white";
    //ctx.drawImage(scoreImage,140,10);
    ctx.fillText("Score: " + score,110,20);
        
    if(shot){
        bulletx += bulletdx;
        bullety += bulletdy;
        ctx.fillStyle = "white";
        ctx.fillRect(bulletx, bullety, 4, 4);
    }
    /*
        if(shot == true || bulletx > 300 || bulletx < 0 || 
       bullety > 300 || bullety < 0 ){ 
        shot == false;
        bulletdx = 0;
        bulletdy = 0;
        bulletx = 1000;
        bullety = 1000;
        
    }
    */
	// sprite sheet building site:
	// 	http://charas-project.net/charas2/index.php

    if(up){
        Pacman.rotation = 32; 
        if(Pacman.CHAR_START_Y > 6)
        Pacman.CHAR_START_Y += -Pacman.speed;
    }
    if(down){
        Pacman.rotation = 96; 
        if(Pacman.CHAR_START_Y < 276)
        Pacman.CHAR_START_Y += Pacman.speed;
    }
    if(left){
        Pacman.rotation = 64; 
        if(Pacman.CHAR_START_X > 6)
            Pacman.CHAR_START_X += -Pacman.speed;
    }
    if(right){
        Pacman.rotation = 0; 
        if(Pacman.CHAR_START_X < 276)
        Pacman.CHAR_START_X += Pacman.speed;
    }
    ctx.drawImage(charImage,
				Pacman.IMAGE_START_X,Pacman.IMAGE_START_Y+
                Pacman.rotation,            // sprite upper left positino	
				Pacman.CHAR_WIDTH,Pacman.CHAR_HEIGHT, // size of a sprite 72 x 96
				Pacman.CHAR_START_X,Pacman.CHAR_START_Y,  // canvas position
				.5*Pacman.CHAR_WIDTH,.5*Pacman.CHAR_HEIGHT      // sprite size shrinkage
				);
    Pacman.IMAGE_START_X += Pacman.CHAR_WIDTH;//change location of drawImage
	if (Pacman.IMAGE_START_X >= 6*Pacman.SPRITE_WIDTH){
       Pacman.IMAGE_START_X = 0;
    }
    
    //RED
        
        if(Pacman.CHAR_START_Y > red.CHAR_START_Y){
            red.rotation = 32;
            red.CHAR_START_Y +=red.speed;
        }
        if(Pacman.CHAR_START_Y < red.CHAR_START_Y){
            red.rotation = 48;
            red.CHAR_START_Y +=-red.speed;
        }
        if(Pacman.CHAR_START_X > red.CHAR_START_X){
            red.rotation = 0;
            red.CHAR_START_X +=red.speed;
        }
        if(Pacman.CHAR_START_X < red.CHAR_START_X){
            red.rotation = 16;
            red.CHAR_START_X +=-red.speed;
        }
    ctx.drawImage(redImage,
				red.IMAGE_START_X,red.IMAGE_START_Y + red.rotation,            // sprite upper left positino	
				red.CHAR_WIDTH,red.CHAR_HEIGHT, // size of a sprite 72 x 96
				red.CHAR_START_X,red.CHAR_START_Y,  // canvas position
				1*red.CHAR_WIDTH,1*red.CHAR_HEIGHT      // sprite size shrinkage
				);
    red.IMAGE_START_X += red.CHAR_WIDTH;//change location of drawImage
	if (red.IMAGE_START_X >= 2*red.SPRITE_WIDTH){
       red.IMAGE_START_X = 0;
    }
    
    //other ghosts
    {
    //blue
    
        if(Pacman.CHAR_START_X > blue.CHAR_START_X){
            blue.rotation = 0;
            blue.CHAR_START_X +=blue.speed;
        }
        if(Pacman.CHAR_START_X < blue.CHAR_START_X){
            blue.rotation = 16;
            blue.CHAR_START_X +=-blue.speed;
        }
        if(Pacman.CHAR_START_Y > blue.CHAR_START_Y){
            blue.rotation = 32;
            blue.CHAR_START_Y +=blue.speed;
        }
        if(Pacman.CHAR_START_Y < blue.CHAR_START_Y){
            blue.rotation = 48;
            blue.CHAR_START_Y +=-blue.speed;
        }
    ctx.drawImage(blueImage,
				blue.IMAGE_START_X,blue.IMAGE_START_Y + blue.rotation,            // sprite upper left positino	
				blue.CHAR_WIDTH,blue.CHAR_HEIGHT, // size of a sprite 72 x 96
				blue.CHAR_START_X,blue.CHAR_START_Y,  // canvas position
				1*blue.CHAR_WIDTH,1*blue.CHAR_HEIGHT      // sprite size shrinkage
				);
    blue.IMAGE_START_X += blue.CHAR_WIDTH;//change location of drawImage
	if (blue.IMAGE_START_X >= 2*blue.SPRITE_WIDTH){
       blue.IMAGE_START_X = 0;
    }
    
    
    //orange
        
        if(Pacman.CHAR_START_Y > orange.CHAR_START_Y){
            orange.rotation = 32;
            orange.CHAR_START_Y +=orange.speed;
        }
        if(Pacman.CHAR_START_Y < orange.CHAR_START_Y){
            orange.rotation = 48;
            orange.CHAR_START_Y +=-orange.speed;
        }
        if(Pacman.CHAR_START_X > orange.CHAR_START_X){
            orange.rotation = 0;
            orange.CHAR_START_X +=orange.speed;
        }
        if(Pacman.CHAR_START_X < orange.CHAR_START_X){
            orange.rotation = 16;
            orange.CHAR_START_X +=-orange.speed;
        }
    ctx.drawImage(orangeImage,
				orange.IMAGE_START_X,orange.IMAGE_START_Y + orange.rotation,            // sprite upper left positino	
				orange.CHAR_WIDTH,orange.CHAR_HEIGHT, // size of a sprite 72 x 96
				orange.CHAR_START_X,orange.CHAR_START_Y,  // canvas position
				1*orange.CHAR_WIDTH,1*orange.CHAR_HEIGHT      // sprite size shrinkage
				);
    orange.IMAGE_START_X += orange.CHAR_WIDTH;//change location of drawImage
	if (orange.IMAGE_START_X >= 2*orange.SPRITE_WIDTH){
       orange.IMAGE_START_X = 0;
    }
    
    
    //pink
        if(Pacman.CHAR_START_X > pink.CHAR_START_X){
            pink.rotation = 0;
            pink.CHAR_START_X +=pink.speed;
        }
        if(Pacman.CHAR_START_X < pink.CHAR_START_X){
            pink.rotation = 16;
            pink.CHAR_START_X +=-pink.speed;
        }
        if(Pacman.CHAR_START_Y > pink.CHAR_START_Y){
            pink.rotation = 32;
            pink.CHAR_START_Y +=pink.speed;
        }
        if(Pacman.CHAR_START_Y < pink.CHAR_START_Y){
            pink.rotation = 48;
            pink.CHAR_START_Y +=-pink.speed;
        }
    
    ctx.drawImage(pinkImage,
				pink.IMAGE_START_X,pink.IMAGE_START_Y + pink.rotation,            // sprite upper left positino	
				pink.CHAR_WIDTH,pink.CHAR_HEIGHT, // size of a sprite 72 x 96
				pink.CHAR_START_X,pink.CHAR_START_Y,  // canvas position
				1*pink.CHAR_WIDTH,1*pink.CHAR_HEIGHT      // sprite size shrinkage
				);
    pink.IMAGE_START_X += pink.CHAR_WIDTH;//change location of drawImage
	if (pink.IMAGE_START_X >= 2*pink.SPRITE_WIDTH){
       pink.IMAGE_START_X = 0;
    }
    
    }
        
    if (
       (bulletx + 4 > red.CHAR_START_X + 1 &&
         bullety + 4 > red.CHAR_START_Y + 2) &&
        (bulletx < red.CHAR_START_X + 15 &&
         bullety < red.CHAR_START_Y + 16)){
        red.CHAR_START_X = -40;
        red.CHAR_START_Y = -50;
        red.speed += .2;
        score++;
        }
        
    if(
        (bulletx + 4 > blue.CHAR_START_X + 1 &&
         bullety + 4 > blue.CHAR_START_Y + 2) &&
        (bulletx < blue.CHAR_START_X + 15 &&
         bullety < blue.CHAR_START_Y + 16)){
        blue.CHAR_START_X = 350;
        blue.CHAR_START_Y = -50;
        blue.speed += .2;
        score++;
    }
        if(
        (bulletx + 4 > orange.CHAR_START_X + 1 &&
         bullety + 4 > orange.CHAR_START_Y + 2) &&
        (bulletx < orange.CHAR_START_X + 15 &&
         bullety < orange.CHAR_START_Y + 16)){
        orange.CHAR_START_X = -50;
        orange.CHAR_START_Y = 350;
        orange.speed += .2;
        score++
        }
        if(
        (bulletx + 4 > pink.CHAR_START_X + 1 &&
         bullety + 4 > pink.CHAR_START_Y + 2) &&
        (bulletx < pink.CHAR_START_X + 15 &&
         bullety < pink.CHAR_START_Y + 16)){
        pink.CHAR_START_X = 350;
        pink.CHAR_START_Y = 350;
        pink.speed += .2;
        score++;
        }
        
                
        
    
    if (
        (Pacman.CHAR_START_X + 16 > red.CHAR_START_X + 1 &&
         Pacman.CHAR_START_Y + 16 > red.CHAR_START_Y + 2) &&
        (Pacman.CHAR_START_X < red.CHAR_START_X + 15 &&
         Pacman.CHAR_START_Y < red.CHAR_START_Y + 16) ||
        
        (Pacman.CHAR_START_X + 16 > blue.CHAR_START_X + 1 &&
         Pacman.CHAR_START_Y + 16 > blue.CHAR_START_Y + 2) &&
        (Pacman.CHAR_START_X < blue.CHAR_START_X + 15 &&
         Pacman.CHAR_START_Y < blue.CHAR_START_Y + 16) ||
        
        (Pacman.CHAR_START_X + 16 > orange.CHAR_START_X + 1 &&
         Pacman.CHAR_START_Y + 16 > orange.CHAR_START_Y + 2) &&
        (Pacman.CHAR_START_X < orange.CHAR_START_X + 15 &&
         Pacman.CHAR_START_Y < orange.CHAR_START_Y + 16) ||
        
        (Pacman.CHAR_START_X + 16 > pink.CHAR_START_X + 1 &&
         Pacman.CHAR_START_Y + 16 > pink.CHAR_START_Y + 2) &&
        (Pacman.CHAR_START_X < pink.CHAR_START_X + 15 &&
         Pacman.CHAR_START_Y < pink.CHAR_START_Y + 16)
        
                
      ){    
        gameover = true;
        }
   }
   else{
        //ctx.fillRect(0,0,stage.width,stage.height);
        ctx.fillStyle = "white";  
        ctx.fillText(TEXT_GAMEOVER, TEXT_GAMEOVER_X, TEXT_GAMEOVER_Y);
   }
}

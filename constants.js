//------------
//System Values
//------------
var STAGE_WIDTH = 300,
	STAGE_HEIGHT = 300,
	//TIME_PER_FRAME = 33, //this equates to 30 fps
	TIME_PER_FRAME = 50, //this equates to 30 fps
    numHearts = 2,
    up = false,
    down = false,
    left = false,
    right = false,
    PATH_BOARD = "img/smallBoard.png",
    PATH_RED = "img/red.png",
    PATH_BLUE = "img/blue.png",
    PATH_ORANGE = "img/orange.png",
    PATH_PINK = "img/pink.png",
    PATH_CHAR = "img/pacman.png",
	GAME_FONTS = "bold 20px sans-serif",
    PATH_SCORE = "img/score.png",
    PATH_LOGO = "img/logo.png",
    PATH_XTREME ="img/Xtreme.png",
    PATH_POWER = "img/power.png"
    gameover = false,
    powerUpExists = false,
    start = false;
    score = 0,
    count = 0,
    c=0,
    shot = false,
    bulletx = 150,
    bullety = -10,
    bulletdx = 0,
    bulletdy = 0;
var Pacman = {
    
    CHAR_WIDTH : 32,
	CHAR_HEIGHT : 32,
	CHAR_START_X : 144,
	CHAR_START_Y : 162,
	IMAGE_START_X : 0,
	IMAGE_START_Y : 0,
	SPRITE_WIDTH : 32,
    rotation : 0,
    speed :  3,
}
var red = {
    
    CHAR_WIDTH : 16,
	CHAR_HEIGHT : 16,
	CHAR_START_X : 10,
	CHAR_START_Y : 10,
	IMAGE_START_X : 0,
	IMAGE_START_Y : 0,
	SPRITE_WIDTH : 16,
    rotation : 0,
    speed : .5 + Math.random(),
}

var blue = {
    
    CHAR_WIDTH : 16,
	CHAR_HEIGHT : 16,
	CHAR_START_X : 260,
	CHAR_START_Y : 10,
	IMAGE_START_X : 0,
	IMAGE_START_Y : 0,
	SPRITE_WIDTH : 16,
    rotation : 0,
    speed : .5 + Math.random(),
}

var orange = {
    
    CHAR_WIDTH : 16,
	CHAR_HEIGHT : 16,
	CHAR_START_X : 10,
	CHAR_START_Y : 260,
	IMAGE_START_X : 0,
	IMAGE_START_Y : 0,
	SPRITE_WIDTH : 16,
    rotation : 0,
    speed : .5 + Math.random(),
}

var pink = {
    
    CHAR_WIDTH : 16,
	CHAR_HEIGHT : 16,
	CHAR_START_X : 260,
	CHAR_START_Y : 260,
	IMAGE_START_X : 0,
	IMAGE_START_Y : 0,
	SPRITE_WIDTH : 16,
    rotation : 0,
    speed : .5 + Math.random(),
}


var TEXT_PRELOADING = "Loading ...", 
	TEXT_PRELOADING_X = 100, 
	TEXT_PRELOADING_Y = 100;

var TEXT_GAMEOVER = "GAME OVER",
	TEXT_GAMEOVER_X = 90, 
	TEXT_GAMEOVER_Y = 100;

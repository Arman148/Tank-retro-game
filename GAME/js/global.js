const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

const foodLife = 0;
const foodTime = 1;
const foodHome = 2;
const foodBomb = 3;
const foodStar = 4;
const foodGod = 5;
const foodNon = 6;

const offerX = 32;
const offerY = 16;

const NON = 0;
const WALL = 1;
const GRID = 2;
const GRASS = 3;
const WATER = 4;
const ICE = 5;
const HOME = 9;
const DIE = 10;


const INIT = 1; 
const PLAY = 2;
const STAGE_INIT = 3;  
const GAMEOVER = 4; 
const SELECT = 5; 
const GAME_START = 6; 


const K_UP = 38;
const K_DOWN = 40;
const K_RIGHT = 39;
const K_LEFT = 37;

const K_SPACE = 32;
const K_TAB = 9;
const K_ENTER = 13;
const K_CTRL = 17;
const K_ALT = 18;

const K_0 = 48;
const K_1 = 49;
const K_2 = 50;
const K_3 = 51;
const K_4 = 52;
const K_5 = 53;
const K_6 = 54;
const K_7 = 55;
const K_8 = 56;
const K_9 = 57;
const K_A = 65;
const K_D = 68;
const K_J = 74;
const K_S = 83;
const K_W = 87;
const images = new Array();

images["home"] = [256,0];
images["map"] = [0,96];
images["tankNum"] = [0,112];
images["myTank"] = [0,0];
images["myTank2"] = [128,0];
images["tank1"] = [0,32];
images["tank2"] = [128,32];
images["tank3"] = [0,64];
images["tankRun"] = [128,96];
images["hitFx"] = [320,0];
images["bombFx"] = [0,160];
images["bullet"] = [80,96];
images["tankStart"] = [256,32];
images["food"] = [256,110];
images["score"] = [192,96];
images["num"] = [256,96];
images["shield"] = [160,96];
images["stageStart"] = [396,96];
images["gameOver"] = [384,64];

const imgStartData = "img/game_menu.gif"
var imgStart = new Image();
imgStart.src = imgStartData;


function GameStart(){
	this.x = 0;
	this.y = 512;	
}


GameStart.prototype.draw = function(){

	console.log(gameState)
	var myCanvas = document.getElementById("upp");
	var ctx = myCanvas.getContext("2d");
	if(this.y == 512)
	{
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, 512, 448);
	}
	ctx.drawImage(imgStart, this.x, this.y, 512, 448);
	
	if(this.y <= 0) 
	{
		this.y = 0;
		ctx.drawImage(imgStart, this.x, this.y, 512, 448);

		ctx.fillStyle = "#FFF";
		gameState = SELECT;
	}
	
	this.y -= 5;
}

GameStart.prototype.init = function(){
	this.y = 512;
}



function TankRun(){
	this.x = 128;
	this.time = 0;
	
	this.num = 0;
	this.ys = [248, 280, 312];
}

TankRun.prototype.draw = function(){
	var myCanvas = document.getElementById("stage");
	var ctx = myCanvas.getContext("2d");
	var img = document.getElementById("spr");
	
	this.time ++;
	var temp;
	
	if( parseInt(this.time / 6) % 2 == 0)
	{
		temp = 0;
	}
	else
	{
		temp = 27;
	}
	ctx.drawImage(img, images["tankRun"][0],images["tankRun"][1] + temp, 27,27, this.x, this.ys[this.num], 27, 27 )
}

TankRun.prototype.init = function(){
	
	var myCanvas = document.getElementById("stage");
	var ctx = myCanvas.getContext("2d");
	ctx.clearRect(this.x, this.ys[this.num], 27, 27);
	
	this.time = 0;
	this.num = 0;
}

TankRun.prototype.next = function(n){
	console.log(n);
	var myCanvas = document.getElementById("stage");
	var ctx = myCanvas.getContext("2d");
	
	ctx.clearRect(this.x, this.ys[this.num], 27, 27);
	
	if(n == 1) 
	{
		if(this.num == 2) 
		{
			this.num = 0;
			return;
		}
		this.num ++;
	}
	else 
	{
		if(this.num == 0) 
		{
			this.num = 2;
			return;
		}
		this.num --;
	}
}



function GameOver(){
	this.x = 210;
	this.y = 512;	
}


GameOver.prototype.draw = function(){
	var myCanvas = document.getElementById("stage");
	var ctx = myCanvas.getContext("2d");
	var img = document.getElementById("spr");
	
	ctx.clearRect(this.x, this.y + 2, 62, 30);
	ctx	
	if(this.y <= 100) 
	{
		gameState = GAME_START;
		ctx.clearRect(this.x, this.y, 62, 30);
		this.init();
	}
	
	this.y -= 2;
}

GameOver.prototype.init = function(){
	this.y = 512;
}




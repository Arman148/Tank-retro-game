
let pressed_buttons = {};
let num = new Num();
let stageStart = new StageStart();	
let gamesOver = new GameOver();
let gameStart = new GameStart();
let food = new Food();
let tankRun = new TankRun();


let scoreBoard = new ScoreBoard();
let sound = new Sound();
let firstLife = 3;

let stopTime;
let homeTime;
let player1,player2;

let gameState = GAME_START; 


let tanks = [];	
let bullets = [];
let hitFxs = [];
let bombFxs = [];
let tankStarts = [];
let scoreNums = [];


let time;
let tankNum = 0;
let level = 5;

let playerNum = 1;

let startLocation = [192,0,384];
	


let intval = 300;
let nextIntval = 300;

function main(){
	setInterval("loop()",21);
}

function loop(){
	switch (gameState)
	{
		case PLAY:
			console.log("PLAY");

		draw();
		updata();
		break;
		
		case INIT:
			console.log("INIT");

		initGame();
		break;
		
		case STAGE_INIT:
			console.log("STAGE_INIT");
		stageStart.draw("stage");
		break;
		
		case GAMEOVER:
			console.log("GAMEOVER");
		draw();
		updata();
		gameOver();
		break;
		
		case SELECT:
			console.log("SELECT");
		tankRun.draw();
		break;
		
		case GAME_START:
			console.log("GAME_START");
		
		gameStart.draw();
		break;			
	}
}


document.onkeydown = function(e) {
        e.preventDefault();
		pressed_buttons[e.keyCode] = true;
		
		if(e.keyCode == K_9 &&  (gameState == SELECT) )
		{
			firstLife = 9;
		}
		if(e.keyCode == K_2 &&  (gameState == PLAY || gameState == STAGE_INIT) ) nextStage();
		if(e.keyCode == K_1 &&  (gameState == PLAY) )food.init();
		if(e.keyCode == K_0 &&  (gameState == PLAY) )
		{
			if(nextIntval == 300)
			{
				nextIntval = 100;
				document.getElementById('fast-mode').innerHTML = "快速出兵模式开启";
			}
			else 	
			{
				nextIntval = 300;
				document.getElementById('fast-mode').innerHTML = "";
			}
		}
		
		if(e.keyCode == K_UP && gameState == SELECT) {
			console.log(e.keyCode);
			console.log(K_UP);
			tankRun.next(-1);

		}
		else if(e.keyCode == K_DOWN && gameState == SELECT) {tankRun.next(1);}
		
		if( (e.keyCode == K_SPACE || e.keyCode == K_ENTER) && gameState == SELECT)
		{
			if(tankRun.num == 0) { playerNum = 1;}
			else if(tankRun.num == 1) { playerNum = 2;}
			else 
			{
				return;
			}
			
			gameState = INIT;
			console.log(gameState)
			tankRun.init();
			clear("upp");
		}
}

function gameOver(){
	gamesOver.draw();
}

function init(){
	selectMap(level);	
	drawAll();
}


function initMyTank(num){
	if(num == 1 && player1.live > 0)
	{
		player1.x = 129;
		player1.y = 385;
		player1.dir = UP;
		player1.godTime = 300;
		player1.isGod = true;
	}
	else if(num == 2 && player2.live > 0)
	{
		player2.x = 256;
		player2.y = 385;
		player2.dir = UP;
		player2.godTime = 300;
		player2.isGod = true;
	}
}

function initGame(){
	player1 = null;
	player2 = null;
	tanks = [];
	pressed_buttons = {};
	
	addTank(129,385,0,1);	
	player1 = tanks[0];
	
	if(playerNum == 2)
	{
		addTank(256,385,0,2);	
		player2 = tanks[1];
	}
	
	for(let i = 0; i < playerNum; i ++)
	{
		tanks[i].live =firstLife;
		tanks[i].score = 0;
	}
	
	level = 1;
	initStage();
	
}

console.log(initGame.prototype);
console.log(Sound.prototype);

function initStage(){
	time = -20;

	tankNum = 0;
	stopTime = 0;
	homeTime = 0;
	
	clearStage();
	food.type = foodNon;
	for(let i = 0; i < playerNum ; i ++){
		initMyTank(tanks[i].name);
	}	
	
	stageStart.init();
	gameState = STAGE_INIT;
}

function clearStage(){
	tankStarts = [];
	bullets = [];
	tanksBomb(false);
	hitFxs = [];
	bombFxs = [];
}

function addTank(x, y, t_p, n){
	let tank;
	switch(t_p)
	{
		case 0: tank = new MyTank(x,y);
				break;
		case 1: tank = new Tank1(x,y);
				break;
		case 2: tank = new Tank2(x,y);
				break;
		case 3: tank = new Tank3(x,y);
				break;
	}
	if(tank.type == 0) {tank.name = n;}
	tanks.push(tank);
}

function addTankStart(pos1, pos2){
	let tank_s = new TankStart(pos1, pos2);

	tankStarts.push(tank_s);

	tankNum ++;
	scoreBoard.drawTankNum();
}

function addTanks(){
	let k;
	time ++;
	if(time % intval == 1)
	{
		k = parseInt(time/intval);
		
		if(tanks.length < 5 && tankNum < 20) 
		{
			if(tankNum % 4 == 2) food.init();
			addTankStart(startLocation[k], 0);
		}
	}
	if(k == 2) 
	{
		intval = nextIntval;
		time = -intval+1;
	}
}

function drawAll(){
	drawMap();	
	drawGrass();
}

function clear(vorCanvas){	
	let myCanvas = document.getElementById(vorCanvas);
	let ctx = myCanvas.getContext("2d");
	
	ctx.clearRect(0,0,512,448);
}



document.onkeyup = function(e) {
	pressed_buttons[e.keyCode] = false;
}

function keyboardEvent(){
	
	for(let i = 0; i < playerNum; i ++)
	{
		if(tanks[i].live == 0) {continue;}
		
		if(tanks[i].name == 1)
		{
			if(pressed_buttons[K_UP]) {player1.move(UP);}
			else if(pressed_buttons[K_DOWN]) {player1.move(DOWN);}
			else if(pressed_buttons[K_LEFT]) {player1.move(LEFT);}
			else if(pressed_buttons[K_RIGHT]) {player1.move(RIGHT);}
			if(pressed_buttons[K_SPACE || K_ENTER]) {player1.shot();}
		}
		
		else if(tanks[i].name == 2)
		{
			if(pressed_buttons[K_W]) {player2.move(UP);}
			else if(pressed_buttons[K_S]) {player2.move(DOWN);}
			else if(pressed_buttons[K_A]) {player2.move(LEFT);}
			else if(pressed_buttons[K_D]) {player2.move(RIGHT);}
		
			if(pressed_buttons[K_J]) {player2.shot();}
		}
	}
}

function updata(){
	updataHitFxs();
	updataBombFxs();
	updataBullets();
	updataTanks();
	updataTankStarts();
	updataFood();
	addTanks();
	
	keyboardEvent();
}



function draw(){
	clear("main");
	drawHitFxs();
	drawBombFxs();
	drawTanks();
	drawBullets();
	drawTankStarts();
	drawFood();
	drawScoreNums();
}




function tanksBomb(bomb){
	while(tanks.length > playerNum)
	{
		let xx = tanks[playerNum].x;
		let yy = tanks[playerNum].y;
		
		if(bomb)
		{
			let bombFx = new BombFx(xx,yy,tanks[playerNum].score);
			bombFxs.push(bombFx);
			sound.play("bomb1");
		}
		tanks.splice(playerNum,1);
	}
}

function changeHome(is_g){
	let wallType;
	if(is_g) 
	{
		wallType = GRID;
		homeTime = 1000;
	}
	
	else 
	{
		wallType = WALL;
	}
	map[23][11] = map[23][12] = map[23][13] = 
	map[23][14] = map[24][11] = map[24][14] = 
	map[25][11] = map[25][14] = wallType;
	
	drawMap();
}

function nextStage(){
	level ++;
	initStage();
}





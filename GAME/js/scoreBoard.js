function ScoreBoard(){
	this.xx = images["tankNum"][0];
	this.yy = images["tankNum"][1];

	
}


ScoreBoard.prototype.drawPlayerLife = function(khagh, kyanq){
	var myCanvas = document.getElementById("upp");
	var ctx = myCanvas.getContext("2d");
	var img = document.getElementById("spr");
	
	if (khagh == 2)
	{
		num.draw("upp", 482, 320, kyanq, true);
	}
	else 
	{
		num.draw("upp", 482, 272, kyanq, true);
	}
};



ScoreBoard.prototype.drawPlayers = function(){
	var myCanvas = document.getElementById("upp");
	var ctx = myCanvas.getContext("2d");
	var img = document.getElementById("spr");
	
	ctx.drawImage(img, this.xx, this.yy, 30, 32, 464, 256, 30, 32);//player1
	
	if(playerNum == 2) 
	{
		ctx.drawImage(img, 30 + this.xx, this.yy, 30, 32, 464, 304, 30, 32);//player2
	}
	
	ctx.drawImage(img, 60 + this.xx, this.yy, 30, 32, 464, 352, 32, 30);//������
};



ScoreBoard.prototype.drawTankNum = function(){
	var myCanvas = document.getElementById("upp");
	var ctx = myCanvas.getContext("2d");
	var img = document.getElementById("spr");
	
	var i, x, y, tx, ty;
	
	ctx.clearRect(466, 34, 32, 160);
	
	x = 466;
	y = 34; 
	
	for(i = 0; i < 20 - tankNum; i++)
	{
		if(i % 2 == 0) 
		{
			tx = 0;
		}
		else 
		{
			tx = 16;
		}
		
		ty = parseInt( i / 2) * 16;
		
		ctx.drawImage(img, 92 + this.xx, this.yy, 14, 14, x + tx, y + ty, 14, 14);
	}
};


ScoreBoard.prototype.draw = function(){
	for(var i = 0; i < playerNum; i ++)
	{
		this.drawPlayerLife(tanks[i].name, tanks[i].live);
	}
	
	this.drawPlayers();
	this.drawTankNum();
	this.drawLevel();
};

ScoreBoard.prototype.drawLevel = function(){
	num.draw("upp", 468, 384, level, true);
};
















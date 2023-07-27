function Score(x, y, num){ 
	Sprite.call(this, x, y, "score", 1);
	
	this.num = num;
	this.time = 0;
}

Score.prototype = new Sprite();

Score.prototype.draw = function (cv){
	var myCanvas = document.getElementById(cv);
	var ctx = myCanvas.getContext("2d");
	var img = document.getElementById("spr");
	
	var sc;

	if (this.num == 100) {sc = 0; } 
	else if (this.num == 200) {sc = 14; }
	else if (this.num == 400) {sc = 28; }
	else if (this.num == 500) {sc = 42; }
	else {return;}
	
	ctx.drawImage(img, images[this.src][0], sc + images[this.src][1], 28, 14, this.x + offerX  - 14, this.y + offerY  - 7, 28, 14 ) ;	
	
	return;
};

Score.prototype.updata = function(){
	this.time ++;
};

Score.prototype.clear = function(cv){
	var myCanvas = document.getElementById(cv);
	var ctx = myCanvas.getContext("2d");
	
	ctx.clearRect(this.x + offerX  - 14, this.y + offerY  - 7, 28, 14);
};

function drawScoreNums(){
	for(var i = 0;i < scoreNums.length; i ++)
	{
		scoreNums[i].draw("upp");
		scoreNums[i].updata();
		
		if(scoreNums[i].time >30 )
		{
			scoreNums[i].clear("upp");
			
			scoreNums.splice(i,1);
			i --;
		}
	}
}

















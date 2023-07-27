
function Num(){
	this.src = "num";
}

Num.prototype.draw = function(canvas, x, y, num, type){
	let myCanvas = document.getElementById(canvas);
	let ctx = myCanvas.getContext("2d");
	let img = document.getElementById("spr");
	
	if(num < 0) {num = 0;}
	
	let temp = num;
	let len = 0;
	let no = 0;
	
	let numx = images[this.src][0];
	let numy = images[this.src][1];
	
	if(type && num != 0)
	{
		while( temp != 0 )
		{
			temp = parseInt(temp / 10) ;
			len ++;
		}	
		x += ( (len - 1)  * 16 - 2 );
	}
	do
	{
		no = num % 10 ;
		ctx.clearRect(x , y , 14, 14) ;	
		ctx.drawImage(img,no * 14 + numx, numy, 14, 14, x ,y , 14, 14) ;	
		x -= 16 ;
		num = parseInt(num / 10);
	}while( num != 0 );
	
	return;
};















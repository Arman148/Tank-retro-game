
function Num(){
	this.src = "num";
}

Num.prototype.draw = function(can, x, y, n, type){
	var myCanvas = document.getElementById(can);
	var ctx = myCanvas.getContext("2d");
	var img = document.getElementById("spr");
	
	if(n < 0) {n = 0;}
	
	var temp = n;
	var len = 0;
	var no = 0;
	
	var numx = images[this.src][0];
	var numy = images[this.src][1];
	
	if(type && n != 0)
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
		no = n % 10 ;
		ctx.clearRect(x , y , 14, 14) ;	
		ctxdrawImage(img,no * 14 + numx, numy, 14, 14, x ,y , 14, 14) ;	
		x -= 16 ;
		n = parseInt(n / 10);
	}while( n != 0 );
	
	return;
};















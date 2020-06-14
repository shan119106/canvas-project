var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let color=["#61f2ff","#ff26ff","#ffcf0a","#ff3399"];
let k=color[Math.floor(Math.random() *4)];
let ball={
x :canvas.width/2,
y : 450,
r :15,
x1 :canvas.width/2,
y1 :100,
r1 :100,
str :[100,110,120,130,140,150],
draw : function(){
ctx.beginPath();
ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
ctx.closePath();
ctx.fillStyle =k;
ctx.fill();
	}

}
myObstacle=[];
function update(){
	document.getElementById("myaudio").play();
	ball.x1=ball.x1;
    	ball.y1=ball.y1-400;
    	ball.r1=ball.str[Math.floor(Math.random() *6)];
    	myObstacle.push(new obstacle(ball.x1,ball.y1,ball.r1,0));
    	for(let a=0;a<myObstacle.length-1;a++){
    		myObstacle[a].y=myObstacle[a].y+20;
       	 	myObstacle[a].circle();
        	myObstacle[a].crash();
        
        }
        score++;
        scoretext="score:"+score;
        ctx.font = '20px serif';
        ctx.fillStyle="white";
        ctx.fillText(scoretext,50,50);
        
        
    }

function e(){
	drew();
    }
function newgame(){
ctx.clearRect(0,0,canvas.width,canvas.height);
ball.x =canvas.width/2;
ball.y = 450;
ball.r =15;
ball.x1 =canvas.width/2;
ball.y1 =100;
var i=0;
var m=0;
let interval=0;
 score=0;
 scoretext="score:"+score;
myObstacle=[];
document.getElementById("overlay").style.display = "none";
document.getElementById("overlap").style.display = "none";
startGame();
document.getElementById("overlay").removeEventListener("click",newgame);  
canvas.addEventListener("click",e);

}
function gameover(){
if(highScore==0){
highScore=score;
}
else if(highScore<=score){
highScore=score;
}
hscore="HighScore:"+highScore;
document.getElementById("overlay").style.display = "block";
document.getElementById("overlay").innerHTML="GAMEOVER<br><br>newgame"; document.getElementById("overlay").addEventListener("click",newgame);  
document.getElementById("overlap").style.display = "block";
document.getElementById("overlap").innerHTML=scoretext+" "+hscore;

   }
function everytime(){
document.getElementById("myaudio").play();
 for(let a=0;a<myObstacle.length;a++){
        myObstacle[a].circle();
        myObstacle[a].crash();
        
        }
        ctx.font = '20px serif';
        ctx.fillStyle="white";
        ctx.fillText(scoretext,50,50);
 }

function obstacle(x,y,r,j){
this.x=x;
this.y=y;
this.r=r;
this.j=j;
this.circle=function(){
ctx.beginPath();
ctx.arc(this.x,this.y,this.r,0+(j*Math.PI/128),Math.PI/2+(j*Math.PI/128),false);
ctx.lineWidth= 10;
ctx.strokeStyle = "#61f2ff";
ctx.stroke();
ctx.closePath();
if(ctx.isPointInStroke(this.x,this.y-this.r)){
 l="#61f2ff";
}
else if(ctx.isPointInStroke(this.x,this.y+this.r)){
	 m="#61f2ff";
 }
ctx.beginPath();
ctx.arc(this.x,this.y,this.r,Math.PI/2+(j*Math.PI/128),Math.PI+(j*Math.PI/128),false);
ctx.strokeStyle = "#ff26ff";
ctx.stroke();
ctx.closePath();
if(ctx.isPointInStroke(this.x,this.y-this.r)){
 l="#ff26ff";
}
else if(ctx.isPointInStroke(this.x,this.y+this.r)){
 m="#ff26ff";
}
ctx.beginPath();
ctx.arc(this.x,this.y,this.r,Math.PI+(j*Math.PI/128),Math.PI*3/2+(j*Math.PI/128),false);
ctx.strokeStyle = "#ffcf0a";
ctx.stroke();
ctx.closePath();
if(ctx.isPointInStroke(this.x,this.y-this.r)){
 l="#ffcf0a";
}
else if(ctx.isPointInStroke(this.x,this.y+this.r)){
	 m="#ffcf0a";
    }
ctx.beginPath();
ctx.arc(this.x,this.y,this.r,Math.PI*3/2+(j*Math.PI/128),Math.PI*2+(j*Math.PI/128),false);
ctx.strokeStyle = "#ff3399";
ctx.stroke();
ctx.closePath();
if(ctx.isPointInStroke(this.x,this.y-this.r)){
 l="#ff3399";
}
else if(ctx.isPointInStroke(this.x,this.y+this.r)){
 m="#ff3399";
    }
j=j+1;
	}
    this.crash=function(){
    	if((((this.y-this.r-5<=ball.y-15)&&(ball.y-15<=(this.y-this.r+5)))||(ball.y+15==this.y-this.r-5))&&(l!==k)){
       	    clearInterval(interval);
            canvas.removeEventListener("click",e);
            gameover();
	    document.getElementById("end").play();
            
            
            }
	else if((((this.y+this.r-5<=ball.y-15)&&(ball.y-15<=this.y+this.r+5))||(ball.y+15==this.y+this.r-5))&&(m!==k)){
	        clearInterval(interval);
            canvas.removeEventListener("click",e);
            gameover();
	    document.getElementById("end").play();
           
		}
         
           }
 
}

/*triangle :function(){
let tri=[];
	for(let t=0;t<4;t++){
    	if(k==color[t]){
        	let n=tri[0];
        	tri[0]=color[t];
            tri[t]=n;
           }
         else{
         	tri[t]=color[t];
            }
       }  
    ctx.translate(ball.x1,ball.y1+100);
   	ctx.rotate(a*Math.PI/180);
	ctx.beginPath();
	ctx.moveTo(0,-80);
    ctx.lineTo(70,40);
    ctx.lineWidth=10;
    ctx.lineCap= "round";
    ctx.strokeStyle=tri[0];
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(70,40);
    ctx.lineTo(-70,40);
    ctx.lineCap= "round";
    ctx.strokeStyle=tri[1];
    ctx.stroke();
    ctx.beginPath();
    ctx.closePath();
    ctx.strokeStyle=tri[2];
    ctx.moveTo(-70,40);
    ctx.lineTo(0,-80);
    ctx.lineCap="round";
    ctx.stroke();
    ctx.closePath();
    ctx.rotate(-a*Math.PI/180);
  	ctx.translate(-ball.x1,-ball.y1-100);
    if(a==360){
    	a=0;
        }
    else{
    	a=a+1;
        }
	}

*/

function bounce(){
	i++;
    m=+i;
    if(m<=40){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ball.y=ball.y-1;
    ball.draw();
    everytime();
       
   
    }
    else if(m<=80){
     ctx.clearRect(0,0,canvas.width,canvas.height);     
     ball.y=ball.y+1;
     ball.draw();
     everytime();
     
    
    }
   else{
   	i=0;
   everytime();
    }
    
 } 
 
function drew() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ball.draw();
  update();
  
  
}
canvas.addEventListener("click",e);
var i=0;
var m=0;
let interval=0;
let score=0;
let scoretext="score:"+score;
let highScore=0;
let hscore="HighScore:"+highScore;
function startGame(){
ball.draw();
ball.x1=ball.x1;
ball.y1=ball.y1;
ball.r1=ball.str[Math.floor(Math.random() *6)];
myObstacle.push(new obstacle(ball.x1,ball.y1,ball.r1,0));
myObstacle[0].circle();
interval=window.setInterval(bounce,20); 
ctx.font = '20px serif';
ctx.fillText(scoretext,50,50);

}
 startGame(); 
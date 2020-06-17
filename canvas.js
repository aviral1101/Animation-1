var canvas=document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// to draw the canvas
var c= canvas.getContext("2d");
// c.fillStyle="lightpink";
// c.fillRect(40 ,50 ,100 ,100);




// lets draw a line
// c.beginPath();
// c.moveTo(300,50);
// c.lineTo(200,200);
// // to color the line
// c.strokeStyle="red";
// c.stroke();



// lets make an arc
// c.beginPath();
// c.arc(250 ,240 , 30 ,0, Math.PI*2,false);
// c.stroke();
// var x=Math.random()*innerWidth;
// var y=Math.random()*innerHeight;
// var dx=Math.random()-0.5;
// var dy=Math.random()-0.5;
// var radius =30;

var mouse={
  x:undefined,
  y:undefined
};

var colorArray=[
  "#1b6ca8",
  "#0a97b0",
  "#ffd3e1",
  "#fce8d5",
];
console.log();
window.addEventListener("mousemove",function(event){
  mouse.x =  event.x;
  mouse.y = event.y;


});

window.addEventListener("resize",function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

function Circle(x,y,dx,dy,radius){
  this.x=x;
  this.y=y;
  this.dy=dy;
  this.dx=dx;
  this.radius=radius;
  this.color=colorArray[Math.floor(Math.random()*colorArray.length)];


  this.draw=function(){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    c.fillStyle=this.color;
    c.fill();
  };
  this.update=function(){
    if (this.x+this.radius>innerWidth || this.x-this.radius<0){
      this.dx=-this.dx;
    }
    if (this.y+this.radius>innerHeight||this.y-this.radius<0){
      this.dy=-this.dy;
    }
    this.x+=this.dx;
    this.y+=this.dy;
//inner activity of the bubbles
    if (mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>-50){
      if (this.radius<40){
        this.radius+=1;
      }
    }
      else if (this.radius>2)
      {
        this.radius-=1;
      }



    this.draw();

  };
}

var CircleArray=[];
function init(){
  CircleArray=[];
  for (var i=0;i<800;i++)
  {
      var radius =Math.random()*3+1;
      var x=Math.random()*(innerWidth-radius*2)+radius;
      var y=Math.random()*(innerHeight-radius*2)+radius;
      var dx=Math.random()-0.5;
      var dy=Math.random()-0.5;
      CircleArray.push(new Circle(x,y,dx,dy,radius));
    }
}
function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);
  for (var i=0;i<1000;i++)
  {
    CircleArray[i].update();
  }
}
init();
animate();

var CANVAS = document.getElementById("canvas");
var ctx = CANVAS.getContext("2d");
var SNAKE = new Array(); //用队列模拟蛇身
var dir = "right";  //用来控制蛇头的方向
var SIZE = 20;  //蛇身的宽度
var foodX = 0;  //食物的x坐标
var foodY = 0;  //食物的y坐标
var HEADX = 0; //蛇头的x坐标
var HEADY = 0; //蛇头的y坐标
var MAXWIDTH = 400; //画布的高度
var MAXHEIGHT = 400; //画布的宽度
var TIME = 200;  //蛇的速度
var SCORE = 0;  //计算玩家分数
var interval = null;

CANVAS.width = MAXWIDTH;
CANVAS.height = MAXHEIGHT;

window.onload = function(){
  newgame();
};
document.getElementById("game_btn").click(function(){
  newgame();
});
function newgame(){
  SNAKE = []; //用队列模拟蛇身
  dir = "right"; //用来控制蛇头的方向
  HEADX = 0; //蛇头的x坐标
  HEADY = 0; //蛇头的y坐标
  SCORE = 0;
  window.clearInterval(interval);//当他碰壁的时候停止定时器
  interval = null;
  //初始化画布
  ctx.clearRect(0, 0, MAXWIDTH, MAXHEIGHT);
  //画一条蛇
  drawSnake();
  //放置食物
  setfood();
  //移动蛇
  interval = window.setInterval(move, TIME);

}
function move(){
  switch(dir){
    case "up":HEADY = HEADY-SIZE;break;
    case "right":HEADX = HEADX+SIZE;break;
    case "down":HEADY = HEADY+SIZE;break;
    case "left":HEADX = HEADX-SIZE;break;
  }
  if(HEADX>MAXWIDTH-SIZE || HEADY>MAXHEIGHT-SIZE || HEADX<0 || HEADY<0){
    alert("哎呦喂 碰墙了 下次注意呦"+"你的分数为："+SCORE+"分");
    window.location.reload();
  }
  for(var i=1;i<SNAKE.length;i++){
    if(SNAKE[i][0] == SNAKE[0][0] && SNAKE[i][1] == SNAKE[0][1]){ //二维数组 r行c列
      alert("哎呦呦 磕到自己了，小心点"+"你的分数为："+SCORE+"分");
      window.location.reload();
    }
  }
  if(SNAKE.length == MAXWIDTH *MAXHEIGHT){
    alert("好厉害!我的亲");
    window.location.reload();
  }
  moveIn(HEADX, HEADY);//移动一格
}
document.onkeydown = function(e) { //改变蛇方向
  switch (e.keyCode){
    case 37://左
      dir = "left";break;//左
      break;
    case 38://上
      dir = "up";break;//上
      break;
    case 39://右
      dir = "right";break;//右
      break;
    case 40://下
      dir = "down";break;//下
      break;
  }
}
//=============================画一条蛇=======================================================
function drawSnake(){
  ctx.fillStyle = "black";
  //画蛇头
  ctx.fillRect (HEADX, HEADY, SIZE, SIZE); /*绘制矩形*/
  SNAKE.push([HEADX, HEADY]);

  //画蛇身
  switch(dir){
    case "up":
      drawBody(HEADX, HEADY + SIZE, HEADX, HEADY + 2 * SIZE);
      break;
    case "right":
      drawBody(HEADX - SIZE, HEADY, HEADX - 2 * SIZE, HEADY);
      break;
    case "down":
      drawBody(HEADX, HEADY - SIZE, HEADX, HEADY - 2 * SIZE);
      break;
    case "left":
      drawBody(HEADX + SIZE, HEADY, HEADX + 2 * SIZE, HEADY);
      break;
  }
}
function drawBody(x1, y1, x2, y2){
  ctx.fillRect (x1, y1, SIZE, SIZE);
  ctx.fillRect (x2, y2, SIZE, SIZE);
  SNAKE.push([x1, y1]);
  SNAKE.push([x2, y2]);
}
//===========================放置食物==============================
function setfood(){
  do{
    foodX = SIZE * Math.floor(Math.random() * MAXWIDTH / SIZE);
    foodY = SIZE * Math.floor(Math.random() * MAXHEIGHT / SIZE);
  }while(foodInSnake());
  ctx.fillStyle =rc();
  ctx.fillRect (foodX, foodY, SIZE, SIZE);
}
function foodInSnake(){
  for (var i = 0; i < SNAKE.length; i++) {
    if(foodX == SNAKE[i][0] && foodY == SNAKE[i][1]){
      return true;
    }
  }
  return false;
}
//========================================移动一格===========================
function moveIn(x, y){
  ctx.fillStyle =rc();
  //ctx.fillStyle = "black";
  ctx.fillRect(x, y, SIZE, SIZE);//重画蛇头
  //把新蛇头添加到 SNAKE 数组
  var newSnake = [[x, y]];
  SNAKE = newSnake.concat(SNAKE);

  if(false == eatfood()){//如果没吃到食物，减少一格蛇尾 
    var snakeTail = SNAKE.pop();//获得蛇尾位置
    ctx.clearRect(snakeTail[0], snakeTail[1], SIZE, SIZE);//去掉蛇尾 
  }
}
function eatfood(){
  if(HEADX == foodX && HEADY == foodY){
    ctx.fillStyle = "block";
    ctx.fillRect (foodX, foodY, SIZE, SIZE);
    setfood();
    SCORE++;
    //$("#score").text(SCORE);
    document.getElementById("score").innerHTML = SCORE;
    return true;
  }
  return false;
}
function rc(){
  var r=Math.floor(Math.random()*256);
  var g=Math.floor(Math.random()*256);
  var b=Math.floor(Math.random()*256);
  return `rgb(${r},${g},${b}`;
}
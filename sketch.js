var backImage,back;
var player, player_running;
var ground,ground_img;
var FoodGroup, obstacleGroup;

var END =0;
var PLAY =1;
var gameState = PLAY;

var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  back=createSprite(0,0,800,400);
  back.addImage(backImage);
  back.scale = 1.5;
  back.x=back.width/2;
  back.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() { 

  if(gameState===PLAY){
  
  if(back.x<100){
    back.x=back.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score = score + 2;
      player.scale += + 0.09
    }
    
    spawnFood();
    spawnObstacles();

    if(obstaclesGroup.isTouching(player)){
      gameState = END;
      }
  }
  
  else if(gameState === END){
    back.velocityX = 0;
    player.visible = false;
  
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
  
    textSize(30);
    fill(255);
    text("Game Over!",300,220);
  }

  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 300,50);
}

function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,200,10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.y = Math.round(random(120,200));
    banana.lifetime = 300;
    banana.velocityX = -5;
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(600,300,10,10);
    obstacle.velocityX = -5;
    obstacle.scale = 0.05;
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
    obstacle.scale = 0.2;
  }
}

var PLAY = 1;

var END = 0;

var gameState = PLAY;

var trex, trex_running, trex_collided;

var ground, invisibleGround, groundImage;


var cloudsGroup, cloudImage;

var obstaclesGroup,obstaclesGroup2, obstacle1, obstacle2, obstacle3;


var score=0;
 var randnum;

var gameOver, restart;

var vill,enem,villages,background;


localStorage["HighestScore"] = 0;


function preload(){
  trex_running =   loadAnimation("game png/villager.png")
 
trex_collided = loadAnimation("game png/villager.png");

groundImage = loadImage("ground2.png");
  
 
cloudImage = loadImage("cloud.png");
  
 
obstacle1 = loadImage("game png/enhead.png");
  
obstacle2 = loadImage("game png/en1.png");

obstacle3 = loadImage("game png/en2.png");
  
obstacle4 = loadImage("game png/en2.png");

obstacle5 = loadImage("game png/en1.png");
  
obstacle6 = loadImage("game png/en2.png");
  
 
 gameOverImg = loadImage("gameOver.png");

  restartImg = loadImage("restart.png");
}


function setup() {
  createCanvas(900, 500);
 
trex = createSprite(100,350,20,50);
  
  
trex.addAnimation("running", trex_running);
  
trex.addAnimation("collided", trex_collided);
  
trex.scale = 0.15;
  
  
ground = createSprite(200,400,400,20);
  
ground.addImage("ground",groundImage);
 
 ground.x = ground.width /2;
 
 ground.velocityX = -(6 + 3*score/100);
  
  
gameOver = createSprite(300,250);
  
gameOver.addImage(gameOverImg);
  
 
 restart = createSprite(300,280);
  
restart.addImage(restartImg);
  
  
gameOver.scale = 0.5;
  
restart.scale = 0.5;

  
gameOver.visible = false;
  
restart.visible = false;
  
  
invisibleGround = createSprite(200,400,400,10);
  
invisibleGround.visible = false;
  
  
cloudsGroup = new Group();
  
obstaclesGroup = new Group();
 obstaclesGroup2 = new Group(); 
  
score = 0;
}


function draw() {
  //trex.debug = true;

  background("grey");
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    
score = score + Math.round(getFrameRate()/60);

    ground.velocityX = -(6 + 3*score/100);

  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();


  
     
    spawnObstacles();
    
  
  
    if(obstaclesGroup.isTouching(trex)){
      trex.visible= false;
        gameState = END;
   
    }
    if(obstaclesGroup2.isTouching(trex))
    {
      obstaclesGroup2.destroyEach();
      gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup2.setVelocityXEach(0);
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
 
obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}



function spawnObstacles() {
  if(frameCount % 60 === 0) { 
  enemychoose = Math.round(random(1,2));
     if(enemychoose === 1)
    {
      var obstacle = createSprite(600,350,10,40);
      //obstacle.debug = true;
      obstacle.velocityX = -(6 + 3*score/100);
      //generate random obstacles
      var rand = Math.round(random(1,2));
      switch(rand) {
          case 1: obstacle.addImage(obstacle1);
                  break;
          case 2: obstacle.addImage(obstacle2);
                  break;
          default: break;
                   }
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.5;
      obstacle.lifetime = 300; 
  }
  else if(enemychoose === 2)
  {
      var obstacle21 = createSprite(600,350,10,40);
      obstaclesGroup2.add(obstacle21)
      //obstacle.debug = true;
      obstacle21.velocityX = -(6 + 3*score/100);
      obstacle21.addImage(obstacle3);
      //assign scale and lifetime to the obstacle           
      obstacle21.scale = 0.5;
      obstacle21.lifetime = 300;
     if(obstacle21.isTouching(trex))    
     {
        obstacle21.visible = false;
     }

  }
    
    
    
    //obstacle.debug=true
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  trex.visible = true;
  obstaclesGroup2.destroyEach();
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}
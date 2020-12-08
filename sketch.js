
var monkey , monkey_running, ground,monkey_stops;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0,survivalTime=0;
var edges;
var PLAY=1;
var END=0;
var gameState=PLAY;
function preload()
{
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_stops=loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() 
{
   createCanvas(900,400);
  
   //create a monkey sprite
   monkey=createSprite(50,310,20,20);
   monkey.addAnimation("moving",monkey_running);
   monkey.scale=0.1;
   
   //create ground sprite;
   ground=createSprite(50,350,900,10);
  
   //create groups of the obstacles and bananas
   FoodGroup=new Group();
   obstacleGroup=new Group();
   score=0;
}


function draw() 
{
   
   background('white');
 
   text("Score:"+score,450,50);
  
   text("Survival time: "+survivalTime,300,50);
  
   if(gameState===PLAY)
   {
      spawnBanana();
      spawnObstacles();
      score=score+Math.round(getFrameRate()/60);
      survivalTime=Math.ceil(frameCount/frameRate());
      // move the monkey
      if(keyDown("space")&&monkey.y>100)
      {
        monkey.velocityY=-10;
      }
      monkey.velocityY=monkey.velocityY+0.8;
      
     // move the ground
      ground.velocityX=-12;
      if(ground.x<0)
      {
        ground.x=ground.width/2;
      }
      if((obstacleGroup).isTouching(monkey))
      {
        gameState=END;
      }
     
   }
  else if(gameState===END)
   {
     ground.velocityX=0;
     monkey.velocityX=0;
     obstacleGroup.setLifetimeEach(-1);
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setLifetimeEach(-1);
     FoodGroup.setVelocityXEach(0);
   }
  edges=createEdgeSprites();
  monkey.collide(ground);
  drawSprites();
  
}

function spawnBanana()
{
  if(frameCount%80===0)
  {
    banana=createSprite(300,50,10,10);
    banana.velocityX=-(3+3*score/100);
    banana.scale=0.1;
    banana.lifeTime=300;
    banana.y=Math.round(random(120,200));
    banana.addImage("moving",bananaImage);
    FoodGroup.add(banana);
    
  }
  
}
function spawnObstacles()
{
  if(frameCount%80===0)
  {

    obstacle=createSprite(50,330,10,10);
    obstacle.velocityX=-(3+3*score/100);
    obstacle.scale=0.1;
    obstacle.x=Math.round(random(100,400));
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.lifeTime=300;
    obstacleGroup.add(obstacle);
    
    
  }
 
}




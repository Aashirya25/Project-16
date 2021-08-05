//Game States
var PLAY=1;
var END=0;
var gameState=1;
var lives = 3;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position, win,lose;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, endImage, winImg,loseImg;
var knifesound, gameoversound
var score = 0
var lives = 3

function preload(){
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  endImage = loadImage("gameover.png")
  winImg = loadImage("youwin.png")
  loseImg = loadImage("lose.png")
  //load sound here
  knifesound = loadSound("knifeSwoosh.mp3")
  gameoversound = loadSound("gameover.mp3")
}



function setup() {
  createCanvas(1280,575);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
   //knife.debug = true

   win = createSprite(650,250,20,20);
   win.addAnimation("SahilRunning",winImg);
   win.scale=0.5;
   win.visible = false

end = createSprite(650,300,20,20);
end.addAnimation("SahilRunning",endImage);
end.scale=2;
end.visible = false

lose = createSprite(650,500,20,20);
lose.addAnimation("SahilRunning",loseImg);
lose.scale=2;
lose.visible = false
  //set collider for sword
  knife.setCollider("rectangle",0,0,50,100);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");

  if(gameState===PLAY){
    
    //Call fruits and Monster function
    fruits();
    Monster();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      knifesound.play();
      score = score + 2
    
      win.visible = false
      
    }
    else
    {
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)){
        lifeover()
        gameState=END;
        gameoversound.play();
        
        //add gameover sound here

        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
       
        end.visible = true
      }
    }
  }
   
  if (lives==0){
    lose.visible = true
  }
  if(monsterGroup.isTouching(knife)){
    lifeover()
  }

  if(keyDown("R")){
    end.visible = false
    win.visible = false
    score = 0
    gameState = PLAY
  }


  if (score >= 30){
    win.visible = true
    fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
  }
  drawSprites();
  //Display score
  textSize(25);
  text("Lives: "+lives, 150, 50);
  text("Score : "+ score,10,50);
  text("Slice all the fruits but beware of the bombs. You have 3 lives. Press R to restart. Get to a score of 30 to win!",10,20)
}


function Monster(){
  if(World.frameCount%100===0){
    monster=createSprite(1280,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    //update below give line of code for increase monsterGroup speed by 10
    monster.velocityX = -(8 + score/2);
    monster.setLifetime=50;
    monsterGroup.add(monster);
    monster.scale = 0.2
  }
}

function fruits(){
  if(World.frameCount%15===0){
    fruit = createSprite(1280,200,20,20);
    position = Math.round(random(1,2));
  
    
     //using random variable change the position of fruit, to make it more challenging
    
    if(position==1)
    {
    fruit.x=600;
    //update below give line of code for increase fruitGroup speed by 4
    fruit.velocityX=-(7+ + score/4) 
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
     //update below give line of code for increase fruitGroup speed by 4
      fruit.velocityX= -(7+ + score/4) 
      }
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}

function lifeover(){
  lives = lives - 1;
  if(lives>=1) {
    gameState = PLAY;
  }
  else {
    gameState = END;
  }
}
//Create variables here
var dog,dogImg
var happyDog,happyDogImg;
var database;
var foodS;
var foodStock;
var feed,lastFed;
var foodObj;
function preload(){
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  foodObj = new Food();

  dog = createSprite(250,350,10,50);
  dog.addImage(dogImg);
  dog.scale = 0.15; 

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
}


function draw() {  
 backgrund(46,139,87);
 
 fedTime = database.ref("FeedTime");
 fedTime.on("value",function(data){
   lastFed = data.val();
 })
   textSize(20);
   fill(255);
   if(lastFed >= 12){
     text("Last Feed :"+ lastFed % 12 + "PM",350,30);
   }else if(lastFed == 0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed :"+ lastFed + "AM",350,30);
   }
  }
   foodObj.display();
  drawSprites();
  

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS ++;
  database.ref('/').update({
    Food:foodS 
  })
}



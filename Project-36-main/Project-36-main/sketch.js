var dog1,dog2,dog,milkImage,foodObj,database,foodStock,lastFed,feedtime,button1,button2,input,save,name;

function preload () {
    dog1 = loadImage("images/dogImg.png");
    dog2 = loadImage("images/dogImg1.png");
    milkImage = loadImage("images/milk.png");
}

function setup () {
    
    createCanvas(1300,500);
    
    dog = createSprite(1000,250,10,10);
    dog.addImage(dog1);
    dog.scale = 0.2;
    
    database = firebase.database();

    var input = createInput("NAME DOG HERE");
    input.position(1150,70);

    var save = createButton("CONTINUE");
    save.position(1170,100);
    save.mousePressed(function(){

      var name = input.value();
      database.ref("/").update({Name:name});

      var button1 = createButton("FEED "+name);
      button1.position(1400,70);
      button1.mousePressed(feedDog);

      var button2 = createButton("ADD FOOD");
      button2.position(1310,70);
      button2.mousePressed(addFoods);

    })

    foodObj = new Food();

}

function draw () {  

    background(46,139,87);

    feedtime = database.ref("lastFed");
    feedtime.on("value",function(data){
      lastFed = data.val();
    })

    foodObj.display();
    drawSprites();

    foodObj.getFoodStock();
    
    fill(255);
    textSize(15);

    if(lastFed >= 12){
      text("Last Fed : " + lastFed % 12 + " PM",350,30);
    } else if (lastFed === 0){
      text("Last Fed : NEVER",350,30);
    } else {
      text("Last Fed : " + lastFed + "AM",350,30);
    }

}

function addFoods(){

  dog.addImage(dog1);
  foodStock++;
  database.ref("/").update({
    Food:foodStock
  })
  
}

function feedDog(){

  dog.addImage(dog2);
  foodObj.deductFood(foodStock);

  database.ref("/").update({
    Food:foodStock,
    lastFed:hour()
  })
  
}
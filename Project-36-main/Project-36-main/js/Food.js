class Food {

    constructor () {
        this.foodStock = database.ref("Food");
        this.lastFed = database.ref("lastFed");
        this.foodStock = foodStock;
        this.image = loadImage("images/milk.png");
    }

    getFoodStock(){
        database.ref("Food").on("value", function (data){
            foodStock = data.val();
        })
    }

    updateFoodStock(stock){
        database.ref("/").update({
            foodStock:stock
        })
    }

    deductFood(x){
        if(x <= 0){
            x = 0;
        } else {
            x = x - 1;
        }
        database.ref("/").update({Food:x});
    }

    display(){
        var x = 80
        var y = 10;
        
        if(foodStock !== 0){
            for(var i = 0; i < foodStock; i++){
                if(i % 10 === 0){
                    x = 80;
                    y = y + 50;
                }
                image(this.image,x,y,50,50);
                x = x + 30;
            }
        }
    }

}
class Actor {
    constructor(sprite){
        this.sprite = Object(null);
        this.x = 0;
        this.y = 0;
        this.dir = 0;
        this.speed = 0;
        this.clear = false;
    }
    get dx(){
        return this.x - (this.sprite.dw / 2);
    }
    get dy(){
        return this.y - (this.sprite.dh / 2);
    }
    // getIsOutofBounds(?)
    update(game){

    }
    draw(){
        
    }
}
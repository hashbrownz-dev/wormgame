class Game {
    constructor(){
        this.score = 0;
        this.lives = 3;
        this.rank = 1;
        this.player = Object(null);
        this.actors = [];
        this.projectiles = [];
        this.drawColShapes = false;
    }
    update(){

    }
    draw(){
        if(this.player)this.player.draw();
        this.actors.forEach( actor => actor.draw() );
        this.projectiles.forEach( proj => proj.draw() );
    }
}
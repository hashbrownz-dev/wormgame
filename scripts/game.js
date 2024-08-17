class Game {
    constructor(){
        this.score = 0;
        this.lives = 3;
        this.rank = 1;
        this.player = new Player();
        this.actors = [];
        this.projectiles = [];
        this.drawColShapes = false;
    }
    update(){
        // Update Player
        if(this.player) this.player.update(this);
        // Update Actors
        // Update Projectiles
        this.projectiles.forEach(proj => proj.update());
        this.projectiles = this.projectiles.filter( p => !p.clear );
        this.draw();
    }
    draw(){
        if(this.player)this.player.draw();
        this.actors.forEach( actor => actor.draw() );
        this.projectiles.forEach( proj => proj.draw() );
    }
}
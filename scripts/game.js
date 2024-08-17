class Game {
    constructor(){
        this.score = 0;
        this.lives = 3;
        this.rank = 0;
        this.player = new Player();
        this.worms = [];
        this.fruits = [];
        this.projectiles = [];
        this.drawColShapes = false;
    }
    update(){
        // Update Player
        if(this.player) this.player.update(this);
        // Update Worms
        if(!this.worms.length){
            this.rank++;
            for(let i = 0 + this.rank; i > 0; i--){
                const x = getRandom(50,750), y = getRandom(50,550), dir = getRandom(0,359);
                const nw = new Worm(x,y,dir,2,wormBody(this.rank + 1,x,y,dir));
                this.worms.push(nw);
            }
        }
        this.worms.forEach( worm => worm.update(this));
        // Update Fruits
        // Update Projectiles
        this.projectiles.forEach(proj => proj.update());
        this.projectiles = this.projectiles.filter( p => !p.clear );
        this.draw();
    }
    draw(){
        if(this.player)this.player.draw();
        this.worms.forEach( w => w.draw());
        this.fruits.forEach( f => f.draw());
        this.projectiles.forEach( p => p.draw());
    }
}
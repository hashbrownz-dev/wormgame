class Game {
    constructor(){
        this.score = 0;
        this.lives = 3;
        this.rank = 0;
        this.view = new ViewBox(2635,1407);
        this.player = new Player(this.view.cx,this.view.cy);
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
                const nw = new Worm(x,y,dir,2,wormBody(this.rank + 8,x,y,dir));
                this.worms.push(nw);
            }
        }
        this.worms.forEach( worm => worm.update(this));
        // Update Fruits
        // Update Projectiles
        this.projectiles.forEach(proj => proj.update(this));
        // Check for Collisions
        this.worms.forEach( w => w.colCheck(this));
        // Clear
        this.worms = this.worms.filter( w => !w.clear );
        this.projectiles = this.projectiles.filter( p => !p.clear );
        this.draw();
    }
    draw(){
        ctx.save();
        ctx.translate(-this.view.x, -this.view.y);
        // Draw BG
        ctx.drawImage(_BG,0,0);
        if(this.player)this.player.draw();
        this.worms.forEach( w => w.draw());
        this.fruits.forEach( f => f.draw());
        this.projectiles.forEach( p => p.draw());
        ctx.restore();
    }
}
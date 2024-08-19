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

const wormBody = (amount,x,y,dir) => {
    const body = [];
    for(let i = amount; i > 0; i--){
        body.push({
            x:x,
            y:y,
            dir:dir,
        });
    }
    return body;
}

class Worm {
    constructor(x,y,dir,speed,children){
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.speed = speed;
        this.children = children;
        this.target = Object(null);
        this.r = 12;
        this.prevPos = [];
        this.gap = 10;
        this.clear = false;
    }
    getTarget(game){
        // target nearest fruit
        if(game.fruits.length){

        }
        // target nearest worm
        else if(game.worms.length > 1){

        }
        // target the player
        else if(game.player){
            return game.player;
        }

    }
    colCheck(game){
        // Projectiles
        game.projectiles.forEach( p => {
            if(!p.clear){
                // Head
                if(colCircPoint(this,p)){
                    p.clear = true;
                    this.clear = true;
                    // Create a new Worm using child 1 as the new head...
                    if(this.children.length){
                        const { x,y,dir } = this.children.shift();
                        const nw = new Worm(x,y,dir,this.speed,this.children);
                        nw.prevPos = this.prevPos.slice(0, this.gap * this.children.length);
                        game.worms.push(nw);
                    }
                    return;
                } else {
                    // Body
                    for(let i = 0; i < this.children.length; i++){
                        if(colCircPoint({ x:this.children[i].x, y:this.children[i].y, r:this.r },p)){
                            p.clear = true;
                            let tl = this.children.length;
                            // new worm
                            if( i+1 < this.children.length){
                                const children = this.children.slice(i+1);
                                const { x,y,dir } = children.shift();
                                const nw = new Worm(x,y,dir,this.speed,children);
                                nw.prevPos = this.prevPos.slice(0, children.length * this.gap);
                                game.worms.push(nw);
                                
                            }
                            // shrink worm
                            this.children = this.children.slice(0,i);
                            this.prevPos = this.prevPos.slice((tl-i)*this.gap);
                            return;
                        }
                    }
                }
            }
        })
    }
    update(game){
        this.prevPos.push({
            x:this.x,
            y:this.y,
            dir:this.dir,
        })
        if(this.prevPos.length > this.gap * this.children.length) this.prevPos.shift();
        // update target
        this.target = game.player;
        // update dir
        let delta = getDirection(this,this.target) - this.dir;
        if (Math.abs(delta) > 180) delta =- delta;
        if (Math.abs(delta) > 4 ) this.dir += 4 * Math.sign(delta);
        // dir clamp?
        if(this.dir < 0){
            this.dir = 359 - Math.abs(this.dir);
        }
        if(this.dir > 359){
            this.dir = this.dir - 359;
        }
        if(this.dir < 0 || this.dir > 359){
            console.log(this.dir);
        }
        // pass prev pos to children
        for(let i = 1; i <= this.children.length; i++){
            let bPos = this.prevPos.length - (this.gap * i);
            if(bPos < 0) bPos = 0;
            const {x,y,dir} = this.prevPos[bPos];
            this.children[i-1] = {
                x,
                y,
                dir,
            }
        }
        // update pos
        const theta = degToRad(this.dir);
        this.y += this.speed * Math.sin(theta);
        this.x += this.speed * Math.cos(theta);
    }
    draw(){
        ctx.fillStyle = 'lime';
        // draw body
        for(let i = this.children.length - 1; i >= 0; i--){
            const seg = this.children[i];
            ctx.beginPath();
            ctx.arc(seg.x,seg.y,this.r,0,7);
            ctx.fill();
        }
        // draw head
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,7);
        ctx.fill();
    }
}
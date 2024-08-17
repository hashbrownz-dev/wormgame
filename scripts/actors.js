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
    update(game){
        // this.prevPos.push({
        //     x:this.x,
        //     y:this.y,
        //     dir:this.dir,
        // })
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
        for(let i = 0; i < this.children.length; i++){
            if(!i){
                const { x,y,dir } = this;
                this.children[i] = {x,y,dir};
            }else{
                const { x,y,dir } = this.children[i-1];
                this.children[i] = { x,y,dir };
            }
        }
        // update pos
        const theta = degToRad(this.dir);
        // const ny = this.speed * Math.sin(theta), nx = this.speed * Math.cos(theta);
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
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,7);
        ctx.fill();
    }
}
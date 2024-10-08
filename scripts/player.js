class Player{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.r = 8;
        this.dw = 16;
        this.dh = 16;
        this.dir = 0;
        this.xs = 0;
        this.ys = 0;
        this.shot = 0;
        this.clear = false;
    }
    get dx(){
        return this.x - (this.dw/2);
    }
    get dy(){
        return this.y - (this.dh/2);
    }
    colCheck(game){
        game.currentLevel.forEach( line => {
            if(colCircLine(this,line)){
                // this.xs *= -1;
                // this.ys *= -1;
            }
        })
    }
    update(Game){
        // Get Player's Client Coords
        const clientCoords = {
            x:this.x - Game.view.x,
            y:this.y - Game.view.y
        }
        // Get direction to mouse
        this.dir = getDirection(clientCoords,Mouse);
        // Blasters
        this.shot--;
        if(Mouse.l && this.shot <= 0){
            const bspawn = getDestination(this.dw/2, this.dir);
            Game.projectiles.push(new Laser(this.x + bspawn.x,this.y + bspawn.y,this.dir));
            this.shot = 10;
        }
        // Thrusters
        if(Mouse.r){
            const theta = degToRad(this.dir);
            const thrust = 0.1;
            // Update xSpeed and ySpeed
            this.xs += thrust * Math.cos(theta);
            if(this.xs > 5) this.xs = 5;
            if(this.xs < -5) this.xs = -5;
            this.ys += thrust * Math.sin(theta);
            if(this.ys > 5) this.ys = 5;
            if(this.ys < -5) this.ys = -5;
        }
        // Calculate Speed and Trajectory
        const nx = this.x + this.xs, ny = this.y + this.ys;
        const speed = getDistance(this,{x:nx,y:ny}),
            traj = getDirection(this,{x:nx,y:ny});
        // Update Position
        if(speed > 5){
            const {x:cx,y:cy} = getDestination(5,traj);
            this.x += cx;
            this.y += cy;
        } else {
            this.x = nx;
            this.y = ny;
        }
        // Update View
        Game.view.update(this.x,this.y);
    }
    draw(){
        ctx.strokeStyle = 'lime';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.dw/2,0,7);
        ctx.stroke();
        ctx.save();
        rotate(this,this.dir);
        // TRIANGLE
        ctx.beginPath();
        ctx.moveTo(this.dx,this.dy);
        ctx.lineTo(this.dx + this.dw, this.dy + (this.dh / 2));
        ctx.lineTo(this.dx, this.dy + this.dh);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.restore();
    }
}

class Laser{
    constructor(x,y,dir){
        this.x = x;
        this.y = y;
        this.r = 4;
        this.dir = dir;
        this.speed = 10;
        this.decay = 50;
        this.clear = false;
    }
    colCheck(game){
        // Boundaries
        game.currentLevel.forEach( poly => {
            if(colPolyPoint(poly,this)){
                this.clear = true;
            }
        })
    }
    update(){
        this.decay--;
        if(this.decay <= 0){
            this.clear = true;
        }else{
            moveActor(this);
        }
    }
    draw(){
        // CIRCLE
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,7);
        ctx.fillStyle='white';
        ctx.fill();
    }
}
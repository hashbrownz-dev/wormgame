// MOVEMENT

const getDirection = (actor, target) => {
    const y = target.y - actor.y;
    const x = target.x - actor.x;
    let opp, adj, d;

    // Determine the sector

    // SECTOR I
    if( x > 0 && y >= 0){
        opp = y;
        adj = x;
        d = 0;
    }
    // SECTOR II
    else if( x <= 0 && y > 0){
        opp = x;
        adj = y;
        d = 89;
    }
    // SECTOR III
    else if( x < 0 && y <= 0 ){
        opp = y;
        adj = x;
        d = 179;
    }
    else if ( x >= 0 && y < 0){
        opp = x;
        adj = y;
        d = 269;
    }

    return radToDeg(Math.abs(Math.atan(opp/adj))) + d;
}

const getDistance = (p1,p2) => {
    const   a = Math.abs(p1.y - p2.y),
            b = Math.abs(p1.x - p2.x);

    return Math.sqrt((a*a)+(b*b));
}

const getDestination = (speed, direction) => {
    // Convert direction to radians
    const theta = degToRad(direction);

    // return new coords
    return {
        x : speed * Math.cos(theta),
        y : speed * Math.sin(theta)
    }
}

const moveActor = (actor) => {
    // Get Hypotenuse and Direction
    const { speed, dir } = actor;

    // Convert direction to Radians
    const theta = degToRad(dir);

    // Get new coords
    let newY = speed * Math.sin(theta);
    let newX = speed * Math.cos(theta);

    // Update actors coords
    actor.x += newX;
    actor.y += newY;
}

//  COLLISION TYPES

const colPoint = (p1, p2) => {
    return p1.x === p2.x && p1.y === p2.y;
}

const colCircPoint = (circ, point) => {
    const dist = getDistance(point, circ);
    return dist < circ.r;
}

const colCirc = (c1,c2) => {
    const dist = getDistance(c1,c2);
    return dist < c1.r + c2.r;
}

const colPointRect = (p,r) => {
    return p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
}

const colRect = (r1, r2) => {
    // r = x,y,w,h
    // right edge of 1 to the right of the left edge of 2
    // left edge of 1 to the left of the right edge of 2 
    // bottom edge of 1 below the top edge of 2
    // top edge of 1 above the bottom edge of 2
    return r1.x + r1.w >= r2.x && r1.x <= r2.x + r2.w && r1.y + r1.h >= r2.y && r1.y <= r2.y + r2.h;
}

const colCircRect = (c,r) => {
    // c = x,y,r
    // r = x,y,w,h
    let { x:testX, y:testY } = c;
    // if the circle is to the left of the rect, test against the left edge
    // if the circle is to the right of the rect, test against the right edge
    // if the circle is above the rect, test against the top edge
    // if the circle is below the rect, test against the bottom edge
    if(c.x < r.x){
        testX = r.x;
    } else if (c.x > r.x + r.w){
        testX = r.x + r.w;
    }
    if(c.y < r.y){
        testY = r.y;
    } else if (c.y > r.y + r.h){
        testY = r.y + r.h;
    }
    return colCircPoint(c,{ x:testX , y:testY });
}

// LINE X POINT

const colLinePoint = (line, point) => {
    const lineLength = getDistance({x:line.x1,y:line.y1},{x:line.x2,y:line.y2});
    const d1 = getDistance(point, {x:line.x1,y:line.y1});
    const d2 = getDistance(point, {x:line.x2,y:line.y2});

    // Higher Buffer => Less Accurate Collision
    const buffer = 0.1;

    return d1+d2 >= lineLength - buffer && d1+d2 <= lineLength + buffer;
}


// CIRCLE X LINE

const colCircLine = (c,l) => {
    const { x1,y1,x2,y2 } = l;
    // if either point on the line is within the circle, return true
    const inside1 = colCircPoint(c,{x:x1,y:y1});
    const inside2 = colCircPoint(c,{x:x2,y:y2});
    if( inside1 || inside2 ) return true;
    // get length of line
    const len = getDistance({x:x1,y:y1},{x:x2,y:y2});
    // get dot product of two vectors (?)
    const dot = ( ((c.x-x1) * (x2-x1)) + ((c.y-y1) * (y2-y1)) ) / Math.pow(len,2);
    const cp = { 
        x:x1 + (dot*(x2-x1)),
        y:y1 + (dot*(y2-y1))
        };
    if(!colLinePoint(l,cp)) return false;
    return colCircPoint(c,cp);
}

// LINE X LINE

const colLine = (l1,l2,getPoint = false) => {
    const { x1, y1, x2, y2 } = l1;
    const { x1:x3, y1:y3, x2:x4, y2:y4 } = l2;

    const uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    const uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

    if(getPoint){
        return {
            x : x1 + (uA * (x2-x1)),
            y : y1 + (uA * (y2-y1))
        }
    }
    return uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1
}

// LINE X RECT

const colLineRect = (l,r) => {
    const leftEdge = {
        x1:r.x,
        y1:r.y,
        x2:r.x,
        y2:r.y + r.h,
    }
    const rightEdge = {
        x1:r.x+r.w,
        y1:r.y,
        x2:r.x+r.w,
        y2:r.y+r.h,
    }
    const topEdge = {
        x1:r.x,
        y1:r.y,
        x2:r.x+r.w,
        y2:r.y,
    }
    const botEdge = {
        x1:r.x,
        y1:r.y+r.h,
        x2:r.x+r.w,
        y2:r.y+r.h,
    }
    const left = colLine(l,leftEdge);
    const right = colLine(l,rightEdge);
    const top = colLine(l,topEdge);
    const bottom = colLine(l,botEdge);
    if( left || right || top || bottom){
        return true;
    }
    return false;
}

// POLYGON X POINT

const colPolyPoint = (poly,point) => {
    // poly = [ {x,y} ... ]
    let collision = false;
    for(let i = 0; i < poly.length; i++){
        const vc = poly[i];
        const vn = i+1 < poly.length ? poly[i+1] : poly[0];
        if( ((vc.y > point.y) != (vn.y > point.y)) && (point.x < (vn.x-vc.x) * (point.y - vc.y) / (vn.y-vc.y) + vc.x) ){
            collision = !collision;
        }
    }
    return collision;
}

// UTILITY

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const coinToss = () => {
    return Math.round(Math.random()) ? true : false;
}

// LEVEL GEOMETRY

const loadLevel = (level) => {
    const output = [];
    level.v.forEach( vert => {
        const shape = [];
        vert.forEach( vert => {
            const a = vert.split(',').map( n => n*200);
            shape.push({
                x:a[0],
                y:a[1],
            })
        })
        output.push(shape);
    })
    return output;
}
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
    const a = Math.abs(p1.y -p2.y),
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

const colCircPoint = (circ, point) => {
    const dist = getDistance(point, circ);
    return dist < circ.r;
}

const colCirc = (c1,c2) => {
    const dist = getDistance(c1,c2);
    return dist < c1.r + c2.r;
}

// UTILITY

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const coinToss = () => {
    return Math.round(Math.random()) ? true : false;
}
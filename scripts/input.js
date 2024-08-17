// MOUSE

const Mouse = {
    x:0,
    y:0,
    l:false,
    r:false,
}

viewport.addEventListener('mousemove', (event)=>{
    Mouse.x = event.offsetX;
    Mouse.y = event.offsetY;
})

const handleMouseClick = (event) => {
    event.preventDefault();
    switch(event.buttons){
        case 1:
            Mouse.l = true;
            Mouse.r = false;
            break;
        case 2:
            Mouse.l = false;
            Mouse.r = true;
            break;
        case 3:
            Mouse.l = true;
            Mouse.r = true;
            break;
        default:
            Mouse.l = false;
            Mouse.r = false;
            break;
    }
}

viewport.addEventListener('mousedown', handleMouseClick);
viewport.addEventListener('mouseup', handleMouseClick);

viewport.addEventListener('contextmenu', event => event.preventDefault());
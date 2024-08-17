const main = () => {
    let pt;
    const _Game = new Game();

    const update = (ts) => {
        if(!pt) pt = ts;
        const elapsed = ts - pt;
        pt = ts;

        // Clear Screen
        ctx.clearRect(0,0,viewport.width, viewport.height);

        // Draw BGC
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,viewport.width,viewport.height);

        // Set Global Scale
        const s = vScale;
        ctx.scale(s,s);

        // Get State(?)

        _Game.update();

        // Draw HUD
        // Reset Transform
        // Loop
        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

main();
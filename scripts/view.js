//  CANVAS

const viewport = document.getElementById('viewport');
const ctx = viewport.getContext('2d');
const baseWidth = viewport.width;
const baseHeight = viewport.height;
let vScale = 1;
ctx.imageSmoothingEnabled = false;
// ctx.lineWidth = 1.5;

const getScale = () => {
    return viewport.width / baseWidth;
}

const resizeCanvas = (size = baseWidth) => {
    if(size < baseWidth) size = baseWidth;
    viewport.width = size;
    vScale = getScale();
    viewport.height = baseHeight * vScale;
    // ctx.imageSmoothingEnabled = false;
    // ctx.lineWidth = 1.5;
}

// TRANSFORMATION FUNCTIONS

/** 
 * Mirrors a shape on th x axis
 * @param {Number} anchor the x coordinate to perform the translation around
 */
const flipX = (anchor) => {
    ctx.translate(anchor,0);
    ctx.scale(-1,1);
    ctx.translate(-anchor,0);
}

/**
 * Mirrors a shape on the y axis
 * @param {Number} anchor the y coordinate
 */
const flipY = (anchor) => {
    ctx.translate(0,anchor);
    ctx.scale(1,-1);
    ctx.translate(0,-anchor);
}

/**
 * Rotates a shape
 * @param {Object} anchor an object containing the x and y coordinates of the anchor point
 * @param {Number} angle the amount, in degrees, by which to rotate the shape
 */
const rotate = (anchor, angle) => {
    const { x, y } = anchor;
    ctx.translate(x,y);
    ctx.rotate(degToRad(angle));
    ctx.translate(-x,-y);
}

/**
 * Sets the horizontal scale of a shape.  A value of 1 results in no horizontal scaling
 * @param {Number} x the x coordinate of the horizontal axis
 * @param {Number} y the y coordinate of the horizontal axis
 * @param {Number} scale the scaling factor
 */
const scaleX = (x,y,scale) => {
    ctx.translate(x,y);
    ctx.scale(scale,1);
    ctx.translate(-x,-y);
}

/**
 * Sets the vertical scale of a shape.  A value of 1 results in no vertical scaling
 * @param {Number} x the x coordinate of the vertical axis
 * @param {Number} y the y coordinate of the vertical axis
 * @param {Number} scale the scaling factor
 */
const scaleY = (x,y,scale) => {
    ctx.translate(x,y);
    ctx.scale(1,scale);
    ctx.translate(-x,-y);
}

/**
 * Sets the horizontal and vertical scale of a shape.  A value of 1 results in no scaling
 * @param {Object} anchor an object containing the x and y coordinates of the anchor point
 * @param {Number} scale the scaling factor
 */
const scaleXY = (anchor, scale) => {
    const { x,y } = anchor;
    ctx.translate(x,y);
    ctx.scale(scale,scale);
    ctx.translate(-x,-y);
}

// CONVERSION FUNCTIONS

/** 
 * Converts degrees to radians
 * @param {Number} deg degrees
 * @returns {Number} radians
 */
const degToRad = (deg) => Math.PI / 180 * deg;

/**
 * Converts radians to degrees
 * @param {Number} rad radians
 * @returns {Number} degrees
 */
const radToDeg = (rad) => 180 / Math.PI * rad;

// drawSprite(?)
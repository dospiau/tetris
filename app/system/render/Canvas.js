import _ from 'lodash';


function _getColor(color) {
    if(_.isObject(color)) {
        return 'rgba(' + [
            color.r,
            color.g,
            color.b,
            color.a
        ] + ')';
    }
    return color;
}
/**
 * Just wrapper to manipulate drawing on Canvas
 */
export default class Canvas {
    constructor(gameContext) {
        this.gameContext = gameContext;
        this.gameContext.canvas.width = 500;
        this.gameContext.canvas.height = 700;
    }

    clear(width = 0, height = 0) {
        // Store the current transformation matrix
        this.gameContext.context.save();
        // Use the identity matrix while clearing the canvas
        this.gameContext.context.setTransform(1, 0, 0, 1, 0, 0);
        this.gameContext.context.clearRect(0, 0,  width,  height);
        // Restore the transform
        this.gameContext.context.restore();
    }

    drawRectangle(x, y, width, height, backgroundColor = {r: 128, g: 128, b: 128, a : 1}, borderColor = {r: 0, g: 0, b: 0, a : 1}) {
      

        this.gameContext.context.fillStyle = _getColor(backgroundColor);
        this.gameContext.context.fillRect(x, y, width, height);

        if(_.isNil(borderColor)) {
            return;
        }
        this.gameContext.context.fillStyle = _getColor(borderColor);
        this.gameContext.context.strokeRect(x, y, width, height);

        return this;
    }

    drawText(x, y, font, size, text, color = 'DarkSlateGray') {
        this.gameContext.context.fillStyle = _getColor(color);
        this.gameContext.context.font = size + 'px ' + font;
        this.gameContext.context.fillText(text, x, y);
    }
}
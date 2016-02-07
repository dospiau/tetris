export default class ScoreRenderer{
    /**
     *
     * @param {Canvas} canvas
     */
    constructor(canvas) {

        this.canvas = canvas;
    }

    render(entity) {
        return this.drawScore(entity);
    }

    drawScore(entity) {
        this.canvas.drawText(
            entity.components.position.x,
            entity.components.position.y,
            entity.components.text.font,
            entity.components.text.size,
            entity.components.score.score + '',
            entity.components.appearance.color

        );
        return this;
    }

}
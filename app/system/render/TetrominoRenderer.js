import Utils from '../../Utils';

export default class TetrominoRenderer {
    /**
     *
     * @param {Canvas} canvas
     */
    constructor(canvas) {
        this.canvas = canvas;
    }

    render(entity) {
        Utils.eachBlock(entity, (col, row, entity) => {
            this.canvas.drawRectangle(
                col * entity.components.tetromino.blockSize + entity.components.position.x,
                row * entity.components.tetromino.blockSize + entity.components.position.y,
                entity.components.tetromino.blockSize,
                entity.components.tetromino.blockSize,
                entity.components.tetromino.definition.color
            )
        });
        return this;
    }
}
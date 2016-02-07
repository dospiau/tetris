import TertrominoLookup from '../../TertrominoLookup'

export default class BoardRenderer{
    /**
     *
     * @param {Canvas} canvas
     */
    constructor(canvas) {

        this.canvas = canvas;
    }

    render(entity) {
        return this.drawBackground(entity).drawCells(entity);
    }

    drawBackground(entity) {
        this.canvas.drawRectangle(
            entity.components.position.x,
            entity.components.position.y,
            entity.components.board.width * entity.components.board.cellSize,
            entity.components.board.height * entity.components.board.cellSize,
            entity.components.appearance.backgroundColor,
            entity.components.appearance.borderColor
        );
        return this;
    }

    drawCells(entity) {
        entity.components.board.cellMatrix.forEach((row) => {
            row.forEach((cell) => {
                this.canvas.drawRectangle(
                    cell.x + entity.components.position.x,
                    cell.y + entity.components.position.y,
                    cell.width,
                    cell.height,
                    cell.type,
                    entity.components.board.borderColor
                )
            })
        });
        return this;
    }

}
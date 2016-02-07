import _ from 'lodash'
import Component from '../Component'
/**
 * Generate 2 dimm. array filed with given value.
 *
 * This could be part of some util module
 *
 * @param {Number} width
 * @param {Number} height
 * @param {*} value
 * @returns {Array}
 */
function _generateArrayOfSize(width, height, value) {
    return _.range(height).map(function () {
        return _.range(width).map(function () {
            return value;
        });
    });
}

/**
 * Create matrix of square cells to draw later.
 *
 * This also sets boundaries of board
 *
 * @param {Number} size
 * @param {Number} row
 * @param {Number}column
 * @param {Array} definition
 * @param {Array} cellMatrix
 * @param {Number} offsetX
 * @param {Number} offsetY
 * @returns {Array}
 * @private
 */
function _getCellMatrix(size, row, column, definition, cellMatrix, offsetX = 0, offsetY = 0) {

    if (definition.length === row) {
        return cellMatrix
    }

    cellMatrix[row][column] = {x : column * size + offsetX, y : row * size + offsetY, height : size, width : size};

    if (column < definition[row].length - 1) {
        return _getCellMatrix(size, row, ++column, definition, cellMatrix, offsetX , offsetY);
    } else {

        if(++row === definition.length) {
            return cellMatrix
        }
        cellMatrix[row] = [];
        return _getCellMatrix(size, row, 0, definition, cellMatrix, offsetX, offsetY);
    }
}


/**
 * Holds board tetrominoMap
 * @param params
 * @constructor
 */
export default class BoardComponent extends Component{

    get name() {
        return 'board'
    }

    constructor(width = 10, height = 30, cellSize = 20) {
        super();
        this.width = parseInt(width);
        this.height = parseInt(height);
        this.cellSize = 20;
        this.cellMatrix = _getCellMatrix(cellSize,0 ,0, _generateArrayOfSize(this.width, this.height, 0), [[]])
    }


}

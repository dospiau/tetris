import _ from 'lodash'
export default class Utils {
    static eachBlock(entity, fn) {
        var bit, row = 0, col = 0, blocks = entity.components.tetromino.definition.blockList[entity.components.tetromino.rotation];
        for(bit = 0x8000 ; bit > 0 ; bit = bit >> 1) {
            if (blocks & bit) {
                fn( col, row, entity);
            }
            if (++col === 4) {
                col = 0;
                ++row;
            }
        }
    }

    /**
     *
     * @param {Entity} tetromino
     */
    static getCurrentAction(tetromino) {
        return _.values(tetromino.components.actionQueue).reduce((previous, current) => {
           if (0 === current.priority) {
               return current;
           }
           return previous;
        },null)
    }

    static isOccupied(tetromino, board) {

        const tc = ((tetromino.components.position.x - board.components.position.x) / tetromino.components.tetromino.blockSize);
        const tr = ((tetromino.components.position.y - board.components.position.y) / tetromino.components.tetromino.blockSize);
        const bw = board.components.board.width - 1;
        const bh = board.components.board.height - 1;
        const cm = board.components.board.cellMatrix;

        let  result = false;
        Utils.eachBlock(tetromino, (col, row) => {
            var x = tc + col;
            var y = tr + row;
            if ((x < 0) || (x > bw) || (y < 0) || (y > bh) || cm[y][x].type) {
                result = true;
            }
        });
        return result;
    }

    static get ACTION() {
        return {
            DOWN   : 0,
            LEFT   : 1,
            RIGHT  : 2,
            ROTATE : 3,
            START  : 4
        }
    }
   
}
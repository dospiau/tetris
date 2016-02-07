import _ from 'lodash'
import Utils from '../Utils'
import System from '../System'

function _rotate(tetromino) {
    if(tetromino.components.tetromino.rotation === 3) {
        tetromino.components.tetromino.rotation = 0
    } else {
        tetromino.components.tetromino.rotation++;
    }

    return tetromino;
}

export default class ActionQueue extends System {

    tick(entityMap) {
        if(!this.gameContext.isStarted) {
            return entityMap;
        }

        var controlledTetromino = null, board = null;

        entityMap.forEach((entity) => {
            if(entity.components.playerControlled && true === entity.components.playerControlled.isControlled) {
                controlledTetromino = entity;
            }
            if(entity.components.board) {
                board = entity;
            }
        });
        if(controlledTetromino) {
            this.processActions(controlledTetromino, board);
        }
        return entityMap;
    }
    /**
     *
     * @param {Entity} tetromino
     */
    processActions(tetromino, board) {
        _.forOwn(tetromino.components.actionQueue.actionQueue, (action) => {
            if(0 === action.priority) {
                return this.applyAction(action, tetromino, board);
            }
            action.priority--;
            return action;
        })
    }

    setDefaultAction(tetromino) {

        if(!tetromino.components.actionQueue.actionQueue[Utils.ACTION.DOWN]) {
            tetromino.components.actionQueue.actionQueue[Utils.ACTION.DOWN] = {
                id : Utils.ACTION.DOWN,
                priority : Math.abs(this.gameContext.speed - 10)
            }
        }
    }

    canDo(controlledTetromino, board, action) {

        const cloned = _.cloneDeep(controlledTetromino);

        switch(action.id) {
            case Utils.ACTION.DOWN:
                cloned.components.position.y += cloned.components.tetromino.blockSize;
                break;
            case Utils.ACTION.LEFT:
                cloned.components.position.x -= cloned.components.tetromino.blockSize;
                break;
            case Utils.ACTION.RIGHT:
                cloned.components.position.x += cloned.components.tetromino.blockSize;
                break;
            case Utils.ACTION.ROTATE:
                _rotate(cloned);
                break;
        }
        return !Utils.isOccupied(cloned, board);
    }

    /**
     *
     * @param {Number} action @see Utils
     * @param {Entity} tetromino
     * @param {Entity} board
     * @returns {*}
     */
    applyAction(action, tetromino, board) {
        delete tetromino.components.actionQueue.actionQueue[action.id];

        if(!this.canDo(tetromino, board, action)) {

            if(action.id === Utils.ACTION.DOWN) {
                tetromino.components.playerControlled.isControlled = false;
                tetromino.components.actionQueue.actionQueue = {};
                this.setOccupiedCells(board, tetromino);
            }
            return;
        }

        switch(action.id) {
            case Utils.ACTION.DOWN:
                tetromino.components.position.y += tetromino.components.tetromino.blockSize;
                break;
            case Utils.ACTION.LEFT:
                tetromino.components.position.x -= tetromino.components.tetromino.blockSize;
                break;
            case Utils.ACTION.RIGHT:
                tetromino.components.position.x += tetromino.components.tetromino.blockSize;
                break;
            case Utils.ACTION.ROTATE:
                _rotate(tetromino);
                break;
        }

        return this.setDefaultAction(tetromino);
    }

    setOccupiedCells(board, tetromino) {

        const tc = ((tetromino.components.position.x - board.components.position.x) / tetromino.components.tetromino.blockSize);
        const tr = ((tetromino.components.position.y - board.components.position.y) / tetromino.components.tetromino.blockSize);

        Utils.eachBlock(tetromino, (col, row, entity) => {
            board.components.board.cellMatrix[row + tr][col + tc].type = entity.components.tetromino.definition.color
        });
        //remove
        this.gameContext.entities.delete(tetromino.id);
    }
}
import _ from 'lodash'
import Tetromino from '../assemblage/TetrominoAssemblage'
import Utils from '../Utils'
import System from '../System'

const _pieceStack = new WeakMap();
const _previewXDelta = new WeakMap();
const _previewYDelta = new WeakMap();
const _previewCoor = new WeakMap();

export default class TetrominoGenerator extends System{

    constructor(gameContext) {
        super(gameContext);
        this.pieces = [];
        _pieceStack.set(this,[]);
        //@FIXME this should be read from some data or settings  
        _previewXDelta.set(this, 400);
        _previewYDelta.set(this, 35);    
    }

    tick(entityMap) {

        if(!this.gameContext.isStarted) {
            return entityMap;
        }

        let tetromino = null, board = null, freeToSet = true, preview;

        entityMap.forEach((entity) => {

            if(entity.components.board) {
                board = entity;
            }
            if(entity.components.playerControlled && true === entity.components.playerControlled.isControlled) {
                freeToSet = false
            }
            if (entity.components.playerControlled && false === entity.components.playerControlled.isControlled) {
                  preview = entity;   
            }
        });

        if(!freeToSet) {
            return entityMap;
        }
        //@FIXME this shoudl go to some method
        if(preview) {
            //pop
            tetromino = preview;
            tetromino.components.playerControlled.isControlled = true;
            //set x,y
            tetromino.components.position.x = _previewCoor.get(this).x;
            tetromino.components.position.y = _previewCoor.get(this).y;
        } else {
            //create
            tetromino = this.createTetromino(board);
            
        }

        //place created
        if(!Utils.isOccupied(tetromino, board)) {
            entityMap.set(tetromino.id, tetromino);
            //create preview and push
            preview = this.createTetromino(board, false);
            _previewCoor.set(this, {
                x :  preview.components.position.x,
                y : preview.components.position.y
            });
            preview.components.position.x = _previewXDelta.get(this);
            preview.components.position.y = _previewYDelta.get(this);
            entityMap.set(preview.id, preview);
        }
        return entityMap;
    }

    createTetromino(board, playerControlled = true) {
        const {type, rotation, x, y} = this.randomPieceDefinition(board);
        return Tetromino.build(type, rotation, x, y, playerControlled);
    }


    randomPieceDefinition(boardEntity) {

        if (this.pieces.length === 0)
            this.pieces = ['i','i','i','i','j','j','j','j','l','l','l','l','o','o','o','o','s','s','s','s','t','t','t','t','z','z','z','z'];
        var type = this.pieces.splice(_.random(0, this.pieces.length-1), 1)[0];
        //@FIXME size from lookup would be better here
        var index = _.random(boardEntity.components.board.cellMatrix[0].length - 5);
        return {
            type: type,
            rotation: 3,
            x: boardEntity.components.board.cellMatrix[0][index].x + boardEntity.components.position.x,
            y: boardEntity.components.position.y
        };
    }
}
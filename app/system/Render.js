import System from '../System'
import Canvas from './render/Canvas'
import BoardRenderer from  './render/BoardRenderer'
import TetrominoRenderer from './render/TetrominoRenderer'
import ScoreRenderer from './render/ScoreRenderer'

const _canvas = new WeakMap();
const _score = new WeakMap();
const _board = new WeakMap();
const _tetromino = new WeakMap();

export default class Render extends System{

    constructor(gameContext) {
        super(gameContext);
        _canvas.set(this, new Canvas(gameContext));
        _score.set(this, new ScoreRenderer(_canvas.get(this)));
        _board.set(this, new BoardRenderer(_canvas.get(this)));
        _tetromino.set(this, new TetrominoRenderer(_canvas.get(this)));
    }

    tick(entitiesMap) {

        if (!this.gameContext.isStarted) {
            return entitiesMap;
        }
        _canvas.get(this).clear(500,700);
        entitiesMap.forEach((entity) => {

            

            if(entity.components.board) {
               this.drawBoard(entity);
            }

            if(entity.components.playerControlled) {
                this.drawTetromino(entity);
            }

            if(entity.components.score) {
               this.drawScore(entity);
            }

        });
        return entitiesMap;
    }

    drawBoard(entity) {
        return _board.get(this).render(entity);
    }

    drawTetromino(entity) {
        return _tetromino.get(this).render(entity);
    }

    drawScore(entity) {
        return _score.get(this).render(entity);
    }
}
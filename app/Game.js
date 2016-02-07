import Utils from './Utils'
import Render from './system/Render'
import BoardAssemblage from './assemblage/BoardAssemblage'
import ScoreAssemblage from './assemblage/ScoreAssemblage'
import UserInput from './system/UserInput'
import TetrominoGenerator from './system/TetrominoGenerator'
import ActionQueue from './system/ActionQueue'
import BoardCheck from './system/BoardCheck'
/* =========================================================================
 *
 * Game.js
 *  This script contains the game logic acts as a controller for the Entity
 *  Component System
 *
 * ========================================================================= */

const _systems = new WeakMap();

/**
 *
 * @param entityMap
 * @param entity
 * @returns {*}
 * @private
 */
function _addEntity(entityMap, entity) {
    return entityMap.set(entity.id, entity);
}

export default class Game {

    constructor(GameContext) {
        this.context = GameContext;
    }
    start() {
        _addEntity(_addEntity(this.context.entities, BoardAssemblage.build()), ScoreAssemblage.build());
        _systems.set(this, [
            new UserInput(this.context)
                .bindKey(Utils.ACTION.LEFT, UserInput.keys.LEFT_ARROW)
                .bindKey(Utils.ACTION.RIGHT, UserInput.keys.RIGHT_ARROW)
                .bindKey(Utils.ACTION.DOWN, UserInput.keys.DOWN_ARROW)
                .bindKey(Utils.ACTION.ROTATE, UserInput.keys.UP_ARROW)
                .bindKey(Utils.ACTION.START, UserInput.keys.SPACE),
            new TetrominoGenerator(this.context),
            new ActionQueue(this.context),
            new Render(this.context),
            new BoardCheck(this.context)
        ]);
       requestAnimationFrame(() => {
           this._gameLoop()
       });
    }

    _gameLoop() {
        _systems.get(this).forEach((system) => {
            //here we could pass only relevant entities
            system.tick(this.context.entities);
        });

        requestAnimationFrame(() => {
            this._gameLoop()
        });
    }
}
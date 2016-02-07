import _ from 'lodash';
import System from '../System'
import Utils from '../Utils';

const _bindings = new WeakMap();
const _pressed = new WeakMap();
const _down = new WeakMap();
const _released = new WeakMap();

function _getCode(e) {
    return e.keyCode;
}

export default class UserInput extends System {

    static get keys() {
        return {
            SPACE : 32,
            LEFT_ARROW : 37,
            UP_ARROW : 38,
            RIGHT_ARROW : 39,
            DOWN_ARROW :40
        }
    }

    constructor(gameContext) {
        super(gameContext);

        _bindings.set(this, {});
        _pressed.set(this, {});
        _down.set(this, {});
        _released.set(this, []);

        gameContext.document.onkeydown = (e) => {
            return this.onKeyDown(e);
        };
        gameContext.document.onkeyup = (e) => {
            return this.onKeyUp(e);
        }
    }

    tick(entityMap) {
        entityMap.forEach((entity) => {
            if(entity.components.playerControlled && true === entity.components.playerControlled.isControlled) {

                [Utils.ACTION.DOWN, Utils.ACTION.ROTATE, Utils.ACTION.LEFT, Utils.ACTION.RIGHT].forEach(action => {
                    if(this.pressed(action) !== undefined) {
                        entity.components.actionQueue.actionQueue[action] = {id: action, priority: 0}
                    }
                });

                if(!_.isUndefined(this.pressed(Utils.ACTION.START)) && !this.gameContext.lost) {
                   this.gameContext.isStarted = !this.gameContext.isStarted;
                }

            }
        });

        //do sth with entities
        this.clearPressed();
        return entityMap;
    }

    bindKey(action, keys) {

        if(_.isNumber(keys)){
            _bindings.get(this)[keys] = action;
            return this;
        }

        if (_.isArray(keys)) {
            keys.forEach((key) => {_bindings.get(this)[key] = action;})
        }
        return this;
    }

    clearPressed() {
        _released.get(this).forEach((item) => {
            _down.get(this)[item] = false;
        });
        _pressed.set(this, {});
        _released.set(this, []);
    }

    pressed(action) {
        return _pressed.get(this)[action];
    }

    down(action) {
        return  _down.get(this)[action];
    }

    released(action) {
        return  _released.get(this).indexOf(action) > -1;
    }

    onKeyDown(e) {
        const action = _bindings.get(this)[_getCode(e)];
        if(action === undefined) {
            return;
        }
        _down.get(this)[action] = true;
        _pressed.get(this)[action] = _down.get(this)[action];
        e.preventDefault();
    }
    onKeyUp(e) {
        const action = _bindings[_getCode(e)];
        if(!action) {
            return;
        }
        _released.get(this).push(action);
        e.preventDefault();
    }
}
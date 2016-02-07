import Utils from '../Utils'
import Component from '../Component'

export default class ActionQueueComponent extends Component{

    get name() {
        return 'actionQueue';
    }
    /**
     *
     * @param {object} action  { id : of action to resolve and its priority :  0 means will be executed instantly number means how many ticks system should wait }
     */
    constructor(action = { id : Utils.ACTION.DOWN, priority : 0}) {
        super();
        this.actionQueue = {};
        this.actionQueue[action.id] = action;
    }
}
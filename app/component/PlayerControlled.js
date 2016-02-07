import Component from '../Component'

export default class PlayerControlled extends Component{

    get name() {
        return 'playerControlled';
    }

    constructor(isControlled = true) {
        super();
        this.isControlled = isControlled;
    }
}
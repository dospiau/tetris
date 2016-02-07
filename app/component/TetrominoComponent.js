import Component from '../Component'

export default class TetrominoComponent extends Component{

    get name() {
        return 'tetromino';
    }

    constructor(type, rotation, definition, blockSize = 20) {
        super();
        this.type = type;
        this.rotation = parseInt(rotation);
        this.definition = definition;
        this.blockSize = parseInt(blockSize);
    }
}
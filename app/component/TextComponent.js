import Component from '../Component'

export default class TextComponent extends Component {
    get name() {
        return 'text'
    }

    constructor(font = 'Courier New', size = 24) {
    	super();
        this.font = font;
        this.size = size;  	
    }
}
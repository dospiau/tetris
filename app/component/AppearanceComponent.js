import Component from '../Component'

export default class AppearanceComponent extends Component{

    get name() {
        return 'appearance';
    }
    constructor(
    	backgroundColor = {r: 255, g: 255, b: 255, a: 1},
    	borderColor = {r: 0, g: 0, b: 0, a: 1},
    	color = {r: 0, g: 0, b: 0, a: 1}
    ) {
        super();
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor;
        this.color = color;
    }
};


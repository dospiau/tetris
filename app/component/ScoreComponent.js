import Component from '../Component'

export default class ScoreComponent extends Component {
    get name() {
        return 'score';
    }

    constructor(score = 0, rows = 0, price = 100) {
    	super();
        this.score = score;
        this.rows = rows;
        this.price = price;	
    }
}
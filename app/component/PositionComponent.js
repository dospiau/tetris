
export default class PositionComponent {
    get name() {
        return 'position'
    }

    constructor(x = 0, y = 0) {
        this.x = parseInt(x);
        this.y = parseInt(y);
    }
}
import System from '../System'

export default class BoardCheck extends System {

    tick(entitiesMap) {
        if (!this.gameContext.isStarted) {
            return entitiesMap;
        }

        var board, score;
        //@TODO use System.reduceEntityMap
        entitiesMap.forEach(entity => {
            if(entity.components.board) {
                board = entity; 
            }
            if(entity.components.score) {
                score = entity;
            }
        });
        this.checkRows(board, score)
    }

    checkRows(board, score) {

        board.components.board.cellMatrix.forEach((row, index) => {
            let isFilled = true;
            row.forEach(cell => {

                if(0 === index && undefined !== cell.type) {
                    //we lost
                    this.gameContext.lost = true;
                    this.gameContext.isStarted = false;
                }

                isFilled &= (undefined !== cell.type)
            });
            if(isFilled) {
                this.removeLine(board, index);
                this.updateScore(score);
                //@TODO after some rows filled we should update speed
            }
        })
    }

    updateScore(score) {
        score.components.score.price *= this.gameContext.speed;
        score.components.score.score += score.components.score.price;
        score.components.score.rows++;
    }

    removeLine(board, line) {
        //@FIXME use gnereics here on array
        let y;
        for(y = line ; y >= 0 ; --y) {

            board.components.board.cellMatrix[y].forEach((cell, index) => {
                if(0 < y) {
                    cell.type = board.components.board.cellMatrix[y - 1][index].type;
                } else {
                    cell.type = undefined;
                }
            });
        }
    }
}
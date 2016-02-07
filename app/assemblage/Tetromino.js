import Entity from '../Entity';
import TertrominoLookup from '../TertrominoLookup'
import TetrominoComponent from '../component/TetrominoComponent'
import PositionComponent from '../component/PositionComponent'
import AppearanceComponent from '../component/AppearanceComponent'
import PlayerControlled from '../component/PlayerControlled'
import ActionQueueComponent from '../component/ActionQueueComponent'

export default class Tetromino {
    static build(type, rotation, x, y) {
        return new Entity()
            .addComponent(new TetrominoComponent(type, rotation, TertrominoLookup.tetrominoMap.get(type)))
            .addComponent(new AppearanceComponent( TertrominoLookup.tetrominoMap.get(type).color))
            .addComponent(new PositionComponent(x, y))
            .addComponent(new PlayerControlled())
            .addComponent(new ActionQueueComponent())
    }
}
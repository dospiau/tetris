import Entity from '../Entity';
import BoardComponent from '../component/BoardComponent';
import AppearanceComponent from  '../component/AppearanceComponent';
import PositionComponent from '../component/PositionComponent';

export default class ScoreAssemblage {

    static build() {
        return new Entity()
            .addComponent(new BoardComponent(10, 30))
            .addComponent(new AppearanceComponent({r: 128, g: 128, b: 128, a: 1}))
            .addComponent(new PositionComponent(5,5));
    }
}




import Entity from '../Entity';
import ScoreComponent from '../component/ScoreComponent';
import AppearanceComponent from  '../component/AppearanceComponent';
import PositionComponent from '../component/PositionComponent';

export default class BoardAssemblage {

    static build() {
        return new Entity()
            .addComponent(new ScoreComponent(10, 30))
            .addComponent(new AppearanceComponent({r: 128, g: 128, b: 128, a: 1}))
            .addComponent(new PositionComponent(5, 5));
    }
}

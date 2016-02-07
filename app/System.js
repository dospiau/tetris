/**
 * This is base class defining interface for system
 */
export default class System {

    /**
     * Just instantiates System in given world
     * @param {Object} gameContext world
     */
    constructor(gameContext) {
        this.gameContext = gameContext;
    }
    /**
     *
     * @param {Map}  entitiesMap
     * @returns {Map} entities Map
     */
    tick(entitiesMap) {
        throw new Error('this method should be implemented in child class');
    }

     //@TODO use it to search for entities in system, but test first :)
    static reduceEntityMap(entityMap, nameList) {
        return entityMap.reduce((previous, current) => {
            nameList.forEach(name => {
                if(current.components[name]) {
                    previous[name] = current;
                }
            });
            return previous;
        },{})
    }
}
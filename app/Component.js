export default class Component {
    /**
     * @returns {String} name of component
     */
    get name() {
        throw new Error('name getter must be implemented and return unique string')
    }
}
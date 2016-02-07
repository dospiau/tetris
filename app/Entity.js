export default class Entity {

    constructor() {
        this.id = (+new Date()).toString(16) + Math.random().toString(36).substring(5);
        // The component data will live in this object
        this.components = {};
    }

    addComponent ( component ){
        // Add component data to the entity
        this.components[component.name] = component;
        return this;
    }

    getByName(componentName) {
        if(typeof componentName === 'function'){
            // get the name from the prototype of the passed component function
            return componentName.prototype.name;
        }
        return componentName;
    }

    removeComponent ( componentName ){
        delete this.components[this.getByName(componentName)];
        return this;
    }
    print () {
        // Function to print / log information about the entity
        console.log(JSON.stringify(this, null, 4));
        return this;
    }
}
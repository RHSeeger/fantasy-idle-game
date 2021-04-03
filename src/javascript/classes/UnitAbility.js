/*
 * The abilities that the players forces can have
 * Generally granted by researching a unit type.
 */
import Project from "./Project.js"
import Resources from "../definitions/Resources.js"

export default class UnitAbility {
    constructor({displayName = '', description = ''} = {}) {
        this.displayName = displayName;
        this.description = description;
    }
}

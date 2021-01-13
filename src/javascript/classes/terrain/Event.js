
/**
 * A specific instance of an Encounter
 * There won't be instances of this created in "definitions"
 * Instead, instances of this will be created during game time, and specific
 * values will be based on Encounter data
 */

export default class Event {
    constructor({encounter, treasure, power} = {}) {
        this.encounter = encounter;
        this.treasure = treasure;
        this.power = power;
    }
}

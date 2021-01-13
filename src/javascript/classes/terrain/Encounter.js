
export default class Encounter {
    constructor({displayName = '', description = '', becomes = null, treasureType = null} = {}) {
        this.displayName = displayName;
        this.description = description;
        this.becomes = becomes; // what type of TerrainSpecial this Encounter becomes when cleared, if any
        this.treasureType = treasureType; // what types of treasure come from the encounter
    }
}

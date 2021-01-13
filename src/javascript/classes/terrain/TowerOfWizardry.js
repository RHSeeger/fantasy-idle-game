
export default class TowerOfWizardry extends TerrainSpecial {
    constructor({displayName = '', description = '', world} = {}) {
        super({
            displayName: displayName,
            description: description
        });
        this.world = world; // The world this wizard tower allows transport to
    }

}

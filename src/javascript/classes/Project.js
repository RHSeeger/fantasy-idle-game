/**
 * Something that can be build (building, unit, special project)
 */

export default class Project {
    constructor({
        displayName = '',
        cost = [],
        upkeep = [],
        description = '',
        dependencies = []} = {}) {
        this.displayName = displayName;
        this.cost = cost;
        this.upkeep = upkeep;
        this.description = description;
        this.dependencies = dependencies;
    }

    /**
     * Returns the upkeep for the specified resource type or, if not known, null
     */
    getUpkeep(type) {
        // upkeep: [{type: Resources.GOLD, amount: 5}],
        const upkeepForType = this.upkeep.find(entry => entry.type === type);
        return (typeof upkeepForType !== 'undefined')
            ? upkeepForType.amount
            : null;
    }

    getCost(type) {
        // upkeep: [{type: Resources.GOLD, amount: 5}],
        const costForType = this.cost.find(entry => entry.type === type);
        return (typeof costForType !== 'undefined')
            ? costForType.amount
            : null;
    }
}

/**
 * User game state data
 */

import Races from "../definitions/Races.js";
import Buildings from "../definitions/Buildings.js";
import Terrains from "../definitions/terrain/Terrains.js";
import SpecialProjects from "../definitions/SpecialProjects.js";

class PlayerConstruction {
    constructor() {
        this.completed = [ Buildings.GRANARY, Buildings.BUILDERS_HALL
            , Buildings.MARKETPLACE, Buildings.ANIMISTS_GUILD, Buildings.BARRACKS,
            Buildings.FORESTERS_GUILD, Buildings.FARMERS_MARKET, Buildings.LIBRARY

        ]; // starting with a granary just to produce some food until we get land added
        this.queue = [ SpecialProjects.HOUSING, Buildings.BARRACKS ];
        this.progress = 0;
    }

    complete(project) {
        if (!this.completed.includes(project)) {
            this.completed.push(project);
        }
    }

    isCompleted(project) {
        return this.completed.includes(project);
    }

    addToQueue(project) {
        if (!this.queue.includes(project)) {
            this.queue.push(project);
        }
    }
    addToQueueFirst(project) {
        if (!this.queue.includes(project)) {
            this.queue.unshift(project);
        }
    }
    addToQueueLast(project) {
        if (!this.queue.includes(project)) {
            this.queue.push(project);
        }
    }

    removeFromQueue(project) {
        const index = this.queue.indexOf(project);
        if (index > -1) {
            this.queue.splice(index, 1);
        }
    }

    isQueued(project){
        return this.queue.includes(project);
    }

    getCurrentProject() {
        if (this.queue.length === 0) {
            // Have this return TRADE_GOODS if we're at max population, if we even have max population
            return SpecialProjects.HOUSING;
        }
        return this.queue[0];
    }
};

class PlayerResources {
    constructor() {
        this.gold = 0;
        this.mana = 0;
    }
};

class PlayerPopulation {
    constructor() {
        this.count = 4000;
        this.numOptionalFarmers = 1; // to generate extra food while testing
    }
}

class PlayerCity {
    constructor() {
        this.cityName = 'York'
        this.primaryRace = Races.HUMAN;
        this.additionalRaces = [];
        this.terrains = [ // Default start has 20 blocks (5x5, minus corners and city (center)
            /* corner */ Terrains.GRASSLAND, Terrains.GRASSLAND, Terrains.GRASSLAND, /* corner */
            Terrains.FOREST, Terrains.GRASSLAND, Terrains.GRASSLAND, Terrains.GRASSLAND, Terrains.GRASSLAND,
            Terrains.FOREST,Terrains.GRASSLAND, /* city */, Terrains.GRASSLAND, Terrains.GRASSLAND,
            Terrains.GRASSLAND, Terrains.GRASSLAND, Terrains.GRASSLAND, Terrains.GRASSLAND, Terrains.GRASSLAND,
            /* corner */ Terrains.GRASSLAND, Terrains.GRASSLAND, Terrains.GRASSLAND, /* corner */
        ]
        this.taxRate = 1;
    }

    isRace(race) {
        return this.primaryRace === race;
    }

    hasAdditionalRace(race) {
        return this.additionalRaces.includes(race);
    }

}
class Player {
    constructor() {
        this.resources = new PlayerResources()
        this.construction = new PlayerConstruction();
        this.population = new PlayerPopulation();
        this.city = new PlayerCity();
    }

    // This only works as long as we're storing only things that make sense as JSON
    // Ok, we're just going to return the same value for now.. because the clone is not keeping methods
    clone() {
        return this;
        //return JSON.parse(JSON.stringify(this));
    }
};

class GameState {
    constructor() {
        this.player = new Player();
        this.paused = false;
        this.debugSpeed = 1;
    }
};

export default GameState;

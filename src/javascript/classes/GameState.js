/**
 * User game state data
 */

import Races from "../definitions/Races.js";
import Buildings from "../definitions/Buildings.js";

class PlayerConstruction {
    constructor() {
        this.completed = [ Buildings.GRANARY, Buildings.BUILDERS_HALL ]; // starting with a granary just to produce some food until we get land added
        this.queue = [];
    }

    complete(project) {
        if (!this.completed.includes(project)) {
            this.completed.push(project);
        }
    }

    isCompleted(project) {
        return this.completed.includes(project);
    }

    enqueue(project) {
        if (!this.queue.includes(project)) {
            this.queue.push(project);
        }
    }

    isQueued(project){
        return this.queue.includes(project);
    }

    getCurrentProject() {
        if (this.queue.length === 0) {
            return null;
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
        this.count = 20000; // TODO: Reduce this to 3
        this.numOptionalFarmers = 1; // to generate extra food while testing
    }
}

class Player {
    constructor() {
        this.cityName = 'York'
        this.primaryRace = Races.HUMAN;
        this.additionalRaces = [];
        this.taxRate = 1;
        this.resources = new PlayerResources()
        this.construction = new PlayerConstruction();
        this.population = new PlayerPopulation();
    }

    // This only works as long as we're storing only things that make sense as JSON
    // Ok, we're just going to return the same value for now.. because the clone is not keeping methods
    clone() {
        return this;
        //return JSON.parse(JSON.stringify(this));
    }

    isRace(race) {
        return this.primaryRace === race;
    }

    hasAdditionalRace(race) {
        return this.additionalRaces.includes(race);
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

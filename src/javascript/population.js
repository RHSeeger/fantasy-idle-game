/**
 * Functions for handling building information
 */

import * as Game from './game.js';
import * as Buildings from './buildings.js';
import * as Races from './races.js';
import * as Resources from './resources.js';

//export const RACES = {
//    HUMAN: 'human',
//    HALFLING: 'halfling',
//    LIZARDMAN: 'lizardman'
//};

const STARTING_VALUES =  {
    race: Races.RACES.HUMAN,
    secondaryRaces: [],
    count: 20000 // TODO: change to 3000, we just need a bigger number for testing
};

$(document).ready(function() {
    const UPDATE_INTERVAL = 10000; // every 10 seconds
    const actualUpdateSpeed = Math.ceil(UPDATE_INTERVAL / Game.getDebugSpeed());
    var updateIntervalId = window.setInterval(updatePopulationCount, actualUpdateSpeed);
    console.log("population setup complete, with update speed (" + actualUpdateSpeed + ")");
});

/**
 * The player's main race
 */
function getPrimaryRace() {
    return getUserPopulationData().race;
}

/**
 * Other races that are part of the empire, either through perks or conquests
 */
function getSecondaryRaces() {
    return getUserPopulationData().secondaryRaces;
}

function updatePopulationCount() {
    if (Game.isPaused() === true) {
        return;
    }

    const currentCount =  getPopulationCount();
    const growthRate = getPopulationGrowthRate();
    const newCount = Math.max(0, currentCount + growthRate);
    console.log("Updating population from [" + currentCount + "] by [" + growthRate + "] to [" + newCount + "]");
    setPopulationCount(newCount);
}

function getPopulationGrowthRate() {
    const populationUnits = getPopulationUnits();
    const foodProduced =Resources.calculateFoodGenerated();
    console.log("Food produced == " + foodProduced);

    var baseRate = Math.ceil((foodProduced - populationUnits) / 2.0) * 10;
    if (hasRace(Races.RACES.LIZARDMAN)) {
        baseRate += 10;
    }

    return baseRate;
}

function getUserPopulationData() {
    const userData = Game.getUserState();
    if (!(userData.hasOwnProperty('population'))) {
        userData['population'] = STARTING_VALUES;
    }
    return userData['population'];
}

function getPopulationCount() {
    return getUserPopulationData().count;
}

function setPopulationCount(count) {
    getUserPopulationData().count = count;

    return count;
}

function getPopulationUnits() {
    return Math.floor(getPopulationCount() / 1000.0);
}

function getPopulationRebelUnits() {
    // TODO: this
    return 1;
}

function hasRace(race) {
    return true;
}

function getNumRequiredFarmers() {
    const numRequiredFood = Resources.getNumRequiredFood();

    var baseFoodLevel = Resources.calculateBaseFoodLevel();

    const foodPerFarmer = getFoodPerFarmer();

    var producedFood = Buildings.hasBuilding(Buildings.BUILDINGS.FORESTERS_GUILD) ? 2 : 0;
    if (producedFood > baseFoodLevel) {
        // If producedFood exceeds base food level, all excess if halved
        producedFood -= ((producedFood - baseFoodLevel) * 0.5);
    }

    producedFood += Buildings.hasBuilding(Buildings.BUILDINGS.GRANARY) ? 2 : 0;
    producedFood += Buildings.hasBuilding(Buildings.BUILDINGS.FARMERS_MARKET) ? 3 : 0;
    producedFood *= 1; // 2 for each Wild game in the city's catchment area

    const totalGeneratedFood = baseFoodLevel + producedFood;
    const neededFarmedFood = numRequiredFood - totalGeneratedFood;

    if (neededFarmedFood <= 0) {
        return 0;
    }

    // The farmer that produce up to baseFoodLevel produce the full amount
    // The farmers producing any amount past that produce at half level
    // So, generate the number of farmers if they all produced at the full amount
    const farmersNeededIfAllFull =  Math.ceil(neededFarmedFood / foodPerFarmer);

    // If the amount we need to farm is less than the base amount, we're good
    if (neededFarmedFood <= baseFoodLevel) {
        return farmersNeededIfAllFull;
    }

    // Then halve the amount over base that was created
    // And calculate how many _more_ we need at half production
    const foodProduceIfAllFull = farmersNeededIfAllFull * foodPerFarmer;
    const foodProducedOverBase = foodProduceIfAllFull - baseFoodLevel;
    if (foodProducedOverBase <= 0) {
        console.log("WARNING: food produced over base was not positive", foodProducedOverBase);
        return farmersNeededIfAllFull;
    }
    const farmersNeededForHalfProduction = Math.ceil(
        (foodProducedOverBase * 0.5) // the half of the "over base" that needs to be farmed
        / (foodPerFarmer / 2.0));    // farmers over base produce at half level

    return farmersNeededIfAllFull + farmersNeededForHalfProduction;
}


function getFoodPerFarmer() {
    const hasAnimistsGuild = Buildings.hasBuilding(Buildings.BUILDINGS.ANIMISTS_GUILD);
    const hasHalflings = hasRace(Races.RACES.HALFLING);
    const foodPerFarmer = (hasAnimistsGuild || hasHalflings) ? 3 : 2;

    return foodPerFarmer;
}

function getNumOptionalFarmers() {
    return 2;
}

function calculateNumRioters() {
    return 1;
}

// -- EXPORTS --

export {
    getPopulationCount,
    setPopulationCount,
    getPopulationUnits,
    hasRace,
    getNumRequiredFarmers,
    getNumOptionalFarmers,
    getPopulationGrowthRate,
    getPrimaryRace,
    getSecondaryRaces,
    getPopulationRebelUnits,
    getFoodPerFarmer,
    calculateNumRioters
    };


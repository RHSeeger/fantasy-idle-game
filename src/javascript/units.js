/**
 * Functions for handling building information
 */

import * as Game from './game.js';
import * as Resources from './resources.js';
import { RESOURCES } from './resources.js';

export const UNITS = {
    SWORDSMAN: 'swordsman'
};

export const UNITS_DATA = {
    [UNITS.SWORDSMAN]: {
        displayName: 'Swordsman',
        cost: { [RESOURCES.PRODUCTION]: 25 },
        upkeep: { [RESOURCES.GOLD]: 1 },
        description: "A basic sword wielder. Better than nothing, but only a little"
    }
};

function hasBuilding(building) {
    return true;
}

function getAllUnits() {
    return Object.keys(UNITS)
        .map(unit => UNITS[unit]);
}

function getDisplayName(unit) {
    return UNITS_DATA[unit].displayName;
}

function getCost(unit, resource) {
    const cost = UNITS_DATA[unit].cost;
    return cost.hasOwnProperty(resource) ? cost[resource] : 0;
}


function getUpkeep(unit, resource) {
    const upkeep = UNITS_DATA[unit].upkeep;
    return upkeep.hasOwnProperty(resource) ? upkeep[resource] : 0;
}


function getDescription(project) {
    return UNITS_DATA[project].description;
}

// -- EXPORTS --

export {
    getAllUnits,
    getDisplayName,
    getCost,
    getUpkeep,
    getDescription
    };

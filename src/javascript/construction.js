/**
 * Module for information about the user's construction projects
 * What projects are currently in progress, queued up, etc
 *
 * Projects can include
 * - buildings
 * - units
 * - special projects - Housing or Trade Goods
 */

import * as Game from './game.js';
import * as Buildings from './buildings.js';
import * as Units from './buildings.js';
import * as Resources from './resources.js';

// Constants
import { BUILDINGS } from './buildings.js';
import { UNITS } from './units.js';

const STARTING_VALUES =  {
    queue: [], // An ordered list of projects that are to be constructed
    constructed: [] // A list of buildings that have already been constructed
};

export const SPECIAL_PROJECTS = {
    HOUSING: 'housing',
    TRADE_GOODS: 'trade_goods'
};

export const SPECIAL_PROJECTS_DATA = {
    [SPECIAL_PROJECTS.HOUSING]: {
        displayName: 'Housing',
        cost: []
    },
    [SPECIAL_PROJECTS.TRADE_GOODS]: {
        displayName: 'Trade Goods',
        cost: []

    }
};

/**
 * Main accessor for user population data. Sets it on user data object if it's not there already
 * @returns {*}
 */
function getUserConstructionData(userState) {
    if (!(userState.hasOwnProperty('construction'))) {
        userState['construction'] = STARTING_VALUES;
    }
    return userState['construction'];
}

/**
 * Updates the population info for one game turn
 * TODO: Use passed in game state
 * TODO: implement me
 */
function update(oldUserState, newUserState) {

}

function getAllSpecialProjects() {
    return Object.keys(SPECIAL_PROJECTS)
        .map(key => SPECIAL_PROJECTS[key]);
}

function getDisplayName(project) {
    return SPECIAL_PROJECTS_DATA[project].displayName;
}

function getCost(project, resource) {
    const cost = SPECIAL_PROJECTS_DATA[project].cost;
    return cost.hasOwnProperty(resource) ? cost[resource] : 0;
}

function getUpkeep(project, resource) {
    return 0;
}

function getDescription(project) {
    return SPECIAL_PROJECTS_DATA[project].description || null;
}

/** EXPORTS **/

export {
    update,
    getAllSpecialProjects,
    getDisplayName,
    getCost,
    getUpkeep,
    getDescription
    };

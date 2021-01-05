/**
 * Functions for handling building information
 */

import * as Game from './game.js';
import * as Resources from './resources.js';
import { RESOURCES } from './resources.js';

export const BUILDINGS = {
    GRANARY: 'granary',
    FARMERS_MARKET: 'farmers_market',
    FORESTERS_GUILD: 'foresters_guild',
    ANIMISTS_GUILD: 'animists_guild',
    MINERS_GUILD: 'miners_guild',
    MARKETPLACE: 'marketplace',
    BANK: 'bank',
    MERCHANTS_GUILD: 'merchants_guild',
    SAWMILL: 'sawmill',
    MECHANICIANS_GUILD: 'mechanicians_guild',
    BUILDERS_HALL: 'builders_hall',
    BARRACKS: 'barracks'
};

export const BUILDINGS_DATA = {
    [BUILDINGS.BUILDERS_HALL]: {
        displayName: 'Barracks',
        cost: { [RESOURCES.PRODUCTION]: 60 },
        upkeep: { [RESOURCES.GOLD]: 1 },
        description: ""
    },
    [BUILDINGS.BARRACKS]: {
        displayName: 'Barracks',
        cost: { [RESOURCES.PRODUCTION]: 30 },
        upkeep: { },
        description: "A simple building used to train and house basic units. When combined with other buildings, allows the the training of more advanced units."
    },
    [BUILDINGS.GRANARY]: {
        displayName: 'Granary',
        cost: { [RESOURCES.PRODUCTION]: 40 },
        upkeep: { [RESOURCES.GOLD]: 1 },
        description: "An important building for beginning town, adds both population growth and food output.",
        dependencies: [ BUILDINGS.BUILDERS_HALL ]

    },
    [BUILDINGS.FARMERS_MARKET]: {
        displayName: "Farmer's Market",
        cost: { [RESOURCES.PRODUCTION]: 100 },
        upkeep: { [RESOURCES.GOLD]: 2 },
        description: ""
    },
    [BUILDINGS.FORESTERS_GUILD]: {
        displayName: "Forester's Guild",
        cost: { [RESOURCES.PRODUCTION]: 200 },
        upkeep: { [RESOURCES.GOLD]: 2 },
        description: ""
    },
    [BUILDINGS.ANIMISTS_GUILD]: {
        displayName: "Animist's Guild",
        cost: { [RESOURCES.PRODUCTION]: 300 },
        upkeep: { [RESOURCES.GOLD]: 5 },
        description: ""
    },
    [BUILDINGS.MINERS_GUILD]: {
        displayName: "Miner's Guild",
        cost: { [RESOURCES.PRODUCTION]: 300 },
        upkeep: { [RESOURCES.GOLD]: 3 },
        description: ""
    },
    [BUILDINGS.MARKETPLACE]: {
        displayName: "Marketplace",
        cost: { [RESOURCES.PRODUCTION]: 100 },
        upkeep: { [RESOURCES.GOLD]: 1 },
        description: ""
    },
    [BUILDINGS.BANK]: {
        displayName: "Bank",
        cost: { [RESOURCES.PRODUCTION]: 250 },
        upkeep: { [RESOURCES.GOLD]: 3 },
        description: ""
    },
    [BUILDINGS.MERCHANTS_GUILD]: {
        displayName: "Merchant's Guild",
        cost: { [RESOURCES.PRODUCTION]: 600 },
        upkeep: { [RESOURCES.GOLD]: 5 },
        description: ""
    },
    [BUILDINGS.SAWMILL]: {
        displayName: "Sawmill",
        cost: { [RESOURCES.PRODUCTION]: 100 },
        upkeep: { [RESOURCES.GOLD]: 2 },
        description: ""
    },
    [BUILDINGS.MECHANICIANS_GUILD]: {
        displayName: "Mechanician's Guild",
        cost: { [RESOURCES.PRODUCTION]: 600 },
        upkeep: { [RESOURCES.GOLD]: 5 },
        description: ""
    }

};

function hasBuilding(building) {
    return true;
}

function getAllBuildings() {
    return Object.keys(BUILDINGS)
        .map(building => BUILDINGS[building]);
}

function getUpkeep(building) {
    return BUILDINGS_DATA[building].upkeep;
}

function getUpkeepGold(building) {
    const upkeep = getUpkeep(building);
    return upkeep.hasOwnProperty(Resources.RESOURCES.GOLD) ? upkeep[Resources.RESOURCES.GOLD] : 0;
}

function getUpkeepMana(building) {
    const upkeep = getUpkeep(building);
    return upkeep.hasOwnProperty(Resources.RESOURCES.MANA) ? upkeep[Resources.RESOURCES.MANA] : 0;
}

// -- EXPORTS --

export {
    hasBuilding,
    getAllBuildings,
    getUpkeep, getUpkeepGold
    };

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
    MECHANICIANS_GUILD: 'mechanicians_guild'
};

export const BUILDINGS_DATA = {
    granary: {
        displayName: 'Granary',
        upkeep: { [RESOURCES.GOLD]: 1 }
    },
    farmers_market: {
        displayName: "Farmer's Market",
        upkeep: { [RESOURCES.GOLD]: 2 }
    },
    foresters_guild: {
        displayName: "Forester's Guild",
        upkeep: { [RESOURCES.GOLD]: 2 }
    },
    animists_guild: {
        displayName: "Animist's Guild",
        upkeep: { [RESOURCES.GOLD]: 5 }
    },
    miners_guild: {
        displayName: "Miner's Guild",
        upkeep: { [RESOURCES.GOLD]: 3 }
    },
    marketplace: {
        displayName: "Marketplace",
        upkeep: { [RESOURCES.GOLD]: 1 }
    },
    bank: {
        displayName: "Bank",
        upkeep: { [RESOURCES.GOLD]: 3 }
    },
    merchants_guild: {
        displayName: "Merchant's Guild",
        upkeep: { [RESOURCES.GOLD]: 5 }
    },
    sawmill: {
        displayName: "Sawmill",
        upkeep: { [RESOURCES.GOLD]: 2 }
    },
    mechanicians_guild: {
        displayName: "Mechanician's Guild",
        upkeep: { [RESOURCES.GOLD]: 5 }
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

/**
 * Functions for handling building information
 */

import * as Game from './game.js';

export const BUILDINGS = {
    GRANARY: 'granary',
    FARMERS_MARKET: 'farmers_market',
    FORESTERS_GUILD: 'foresters_guild',
    ANIMISTS_GUILD: 'animists_guild',
    MINERS_GUILD: 'miners_guild',
    MARKETPLACE: 'marketplace',
    BANK: 'bank',
    MERCHANTS_GUILD: 'merchants_guild'
};

export const BUILDINGS_DATA = {
    granary: {
        displayName: 'Granary',
        upkeepGold: 1
    },
    farmers_market: {
        displayName: "Farmer's Market",
        upkeepGold: 2
    },
    foresters_guild: {
        displayName: "Forester's Guild",
        upkeepGold: 2
    },
    animists_guild: {
        displayName: "Animist's Guild",
        upkeepGold: 5
    },
    miners_guild: {
        displayName: "Miner's Guild",
        upkeepGold: 3
    },
    marketplace: {
        displayName: "Marketplace",
        upkeepGold: 1
    },
    bank: {
        displayName: "Bank",
        upkeepGold: 3
    },
    merchants_guild: {
        displayName: "Merchant's Guild",
        upkeepGold: 5
    }

};

function hasBuilding(building) {
    return true;
}

function getAllBuildings() {
    return Object.keys(BUILDINGS)
        .map(building => BUILDINGS[building]);
}

// -- EXPORTS --

export {
    hasBuilding,
    getAllBuildings
    };

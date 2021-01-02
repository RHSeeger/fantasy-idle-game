/**
 * Functions for handling building information
 */

import * as Game from './game.js';

export const BUILDINGS = {
    GRANARY: 'granary',
    FARMERS_MARKET: 'farmers_market',
    FORESTERS_GUILD: 'foresters_guild',
    ANIMISTS_GUILD: 'animists_guild'
};

function hasBuilding(building) {
    return true;
}

// -- EXPORTS --

export { hasBuilding };

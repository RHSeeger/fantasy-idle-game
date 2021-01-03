/**
 * Terrain (land) methods
 */

export const TERRAINS = {}

export const TERRAIN_SPECIALS = {
    SILVER_ORE: 'silver_ore',
    GOLD_ORE: 'gold_ore',
    GEMS: 'gems'
};

export const TERRAIN_SPECIALS_DATA = {
    silver_ore: {
        displayName: 'Silver Ore',
        goldValue: 2
    },
    gold_ore: {
        displayName: 'Gold Ore',
        goldValue: 3
    },
    gems: {
        displayName: 'Gems',
        goldValue: 5
    }
}

function getTerrainTypeCount(type) {
    // TODO: this
    return 0;
}

/**
 * For a given terrain type special, return the number of that type the user's empire has
 */
function getTerrainSpecialTypeCount(type) {
    // TODO: actually implement this
    if (type === TERRAIN_SPECIALS.GOLD_ORE) {
        return 0.5; // The empire has one gold ore, but it's either shared (if we implement that) or on a secondary city
    }
    return 0;
}

export {
    getTerrainTypeCount,
    getTerrainSpecialTypeCount
    }
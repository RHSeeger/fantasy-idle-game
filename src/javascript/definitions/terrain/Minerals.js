import Mineral from "../../classes/terrain/Mineral.js"

const SILVER_ORE = new Mineral({
    displayName: "Silver Ore",
    description: ""
});
const GOLD_ORE = new Mineral({
    displayName: "Gold Ore",
    description: ""
});
const GEMS = new Mineral({
    displayName: "Gems",
    description: ""
});
const IRON_ORE = new Mineral({
    displayName: "Iron Ore",
    description: ""
});
const COAL = new Mineral({
    displayName: "Coal",
    description: ""
});
const MITHRIL_ORE = new Mineral({
    displayName: "Mithril Ore",
    description: ""
});
const ADAMANTIUM_ORE = new Mineral({
    displayName: "Adamantium Ore",
    description: ""
});
const QUORK_CRYSTALS = new Mineral({
    displayName: "Quork Crystals",
    description: ""
});
const CRYSX_CRYSTALS = new Mineral({
    displayName: "Crysx Crystals",
    description: ""
});
const NIGHTSHADE = new Mineral({
    displayName: "Nightshade",
    description: ""
});
const WILD_GAME = new Mineral({
    displayName: "Wild Game",
    description: ""
});


const Minerals = {
    SILVER_ORE: SILVER_ORE,
    GOLD_ORE: GOLD_ORE,
    GEMS: GEMS,
    IRON_ORE: IRON_ORE,
    COAL: COAL,
    MITHRIL_ORE: MITHRIL_ORE,
    ADAMANTIUM_ORE: ADAMANTIUM_ORE,
    QUORK_CRYSTALS: QUORK_CRYSTALS,
    CRYSX_CRYSTALS: CRYSX_CRYSTALS,
    NIGHTSHADE: NIGHTSHADE,
    WILD_GAME: WILD_GAME
};

const keys = Object.keys(Minerals);
Minerals.getValues = function() {
    return keys.map(item => Minerals[item]);
};
Minerals.getKeys = function() {
    return keys;
};

export default Minerals;
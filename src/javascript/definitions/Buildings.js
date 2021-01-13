
import Building from "../classes/Building.js"
import Resources from "./Resources.js"

const BUILDERS_HALL = new Building({
    displayName: "Builder's Hall",
    cost: [{type: Resources.PRODUCTION, amount: 60}],
    upkeep: [{type: Resources.GOLD, amount: 1}],
    description: "N/A",
    dependencies: []
});

const SMITHY = new Building({
    displayName: "Smithy",
    cost: [{type: Resources.PRODUCTION, amount: 40}],
    upkeep: [{type: Resources.GOLD, amount: 1}],
    description: "",
    dependencies: []
});

const GRANARY = new Building({
    displayName: "Granary",
    cost: [{type: Resources.PRODUCTION, amount: 40}],
    upkeep: [{type: Resources.GOLD, amount: 1}],
    description: "An important building for beginning town, adds both population growth and food output.",
    dependencies: [BUILDERS_HALL]
});

const BARRACKS = new Building({
    displayName: "Barracks",
    cost: [{type: Resources.PRODUCTION, amount: 30}],
    upkeep: [ ],
    description: "A simple building used to train and house basic units. When combined with other buildings, allows the the training of more advanced units.",
    dependencies: [ ]
});

const MARKETPLACE = new Building({
    displayName: "Marketplace",
    cost: [{type: Resources.PRODUCTION, amount: 100}],
    upkeep: [{type: Resources.GOLD, amount: 1}],
    description: "",
    dependencies: [ ]
});

const FARMERS_MARKET = new Building({
    displayName: "Farmer's Market",
    cost: [{type: Resources.PRODUCTION, amount: 100}],
    upkeep: [{type: Resources.GOLD, amount: 2}],
    description: "",
    dependencies: [GRANARY, SMITHY, MARKETPLACE]
});

const SAWMILL = new Building({
    displayName: "Sawmill",
    cost: [{type: Resources.PRODUCTION, amount: 100}],
    upkeep: [{type: Resources.GOLD, amount: 2}],
    description: "",
    dependencies: [ /* LandResource.FOREST */ ]
});

const FORESTERS_GUILD = new Building({
    displayName: "Forester's Guild",
    cost: [{type: Resources.PRODUCTION, amount: 200}],
    upkeep: [{type: Resources.GOLD, amount: 2}],
    description: "",
    dependencies: [SAWMILL /* , LandResource.FOREST */ ]
});

const SHRINE = new Building({
    displayName: "Shrine",
    cost: [{type: Resources.PRODUCTION, amount: 100}],
    upkeep: [{type: Resources.GOLD, amount: 1}],
    description: "",
    dependencies: [BUILDERS_HALL]
});

const TEMPLE = new Building({
    displayName: "Temple",
    cost: [{type: Resources.PRODUCTION, amount: 200}],
    upkeep: [{type: Resources.GOLD, amount: 2}],
    description: "",
    dependencies: [SHRINE]
});

const STABLES = new Building({
    displayName: "Stables",
    cost: [{type: Resources.PRODUCTION, amount: 80}],
    upkeep: [{type: Resources.GOLD, amount: 2}],
    description: "",
    dependencies: [SMITHY]
});

const ANIMISTS_GUILD = new Building({
    displayName: "Animist's Guild",
    cost: [{type: Resources.PRODUCTION, amount: 200}],
    upkeep: [{type: Resources.GOLD, amount: 5}],
    description: "",
    dependencies: [TEMPLE, STABLES]
});

const MINERS_GUILD = new Building({
    displayName: "Miner's Guild",
    cost: [{type: Resources.PRODUCTION, amount: 300}],
    upkeep: [{type: Resources.GOLD, amount: 3}],
    description: "",
    dependencies: [BUILDERS_HALL /* LandResource.HILL OR LandResource.MOUNTAIN OR LandResource.VOLCANO */ ]
});

const LIBRARY = new Building({
    displayName: "Library",
    cost: [{type: Resources.PRODUCTION, amount: 60}],
    upkeep: [{type: Resources.GOLD, amount: 1}],
    description: "",
    dependencies: [BUILDERS_HALL]
});

const SAGES_GUILD = new Building({
    displayName: "Sage's Guild",
    cost: [{type: Resources.PRODUCTION, amount: 120}],
    upkeep: [{type: Resources.GOLD, amount: 2}],
    description: "",
    dependencies: [LIBRARY]
});

const UNIVERSITY = new Building({
    displayName: "University",
    cost: [{type: Resources.PRODUCTION, amount: 300}],
    upkeep: [{type: Resources.GOLD, amount: 3}],
    description: "",
    dependencies: [SAGES_GUILD]
});

const BANK = new Building({
    displayName: "Bank",
    cost: [{type: Resources.PRODUCTION, amount: 250}],
    upkeep: [{type: Resources.GOLD, amount: 3}],
    description: "",
    dependencies: [MARKETPLACE, UNIVERSITY]
});

const SHIPWRIGHTS_GUILD = new Building({
    displayName: "Shipwright's Guild",
    cost: [{type: Resources.PRODUCTION, amount: 100}],
    upkeep: [{type: Resources.GOLD, amount: 1}],
    description: "",
    dependencies: []
});

const SHIPYARD = new Building({
    displayName: "Shipyard",
    cost: [{type: Resources.PRODUCTION, amount: 200}],
    upkeep: [{type: Resources.GOLD, amount: 2}],
    description: "",
    dependencies: [SAWMILL, SHIPWRIGHTS_GUILD /*, LandResource.SHORE */ ]
});

const MERCHANTS_GUILD = new Building({
    displayName: "Merchant's Guild",
    cost: [{type: Resources.PRODUCTION, amount: 600}],
    upkeep: [{type: Resources.GOLD, amount: 5}],
    description: "",
    dependencies: [BANK, SHIPYARD]
});

const MECHANICIANS_GUILD = new Building({
    displayName: "Mechanician's Guild",
    cost: [{type: Resources.PRODUCTION, amount: 600}],
    upkeep: [{type: Resources.GOLD, amount: 5}],
    description: "",
    dependencies: [MINERS_GUILD, UNIVERSITY]
});

const Buildings = {
    BUILDERS_HALL: BUILDERS_HALL,
    SMITHY, SMITHY,
    GRANARY: GRANARY,
    BARRACKS: BARRACKS,
    FARMERS_MARKET: FARMERS_MARKET,
    FORESTERS_GUILD: FORESTERS_GUILD,
    ANIMISTS_GUILD: ANIMISTS_GUILD,
    MINERS_GUILD: MINERS_GUILD,
    MARKETPLACE: MARKETPLACE,
    BANK: BANK,
    MERCHANTS_GUILD: MERCHANTS_GUILD,
    SAWMILL: SAWMILL,
    MECHANICIANS_GUILD: MECHANICIANS_GUILD,
    SHRINE: SHRINE,
    TEMPLE: TEMPLE,
    STABLES: STABLES,
    LIBRARY: LIBRARY,
    SAGES_GUILD: SAGES_GUILD,
    UNIVERSITY: UNIVERSITY,
    SHIPWRIGHTS_GUILD: SHIPWRIGHTS_GUILD,
    SHIPYARD: SHIPYARD
};
const keys = Object.keys(Buildings);
Buildings.getValues = function() {
    return keys.map(building => Buildings[building]);
}

export default Buildings;
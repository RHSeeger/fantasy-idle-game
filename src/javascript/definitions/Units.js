
import Unit from "../classes/Unit.js"
import UnitAbilities from "./UnitAbilities.js"
import Resources from "./Resources.js"

const SWORDSMAN = new Unit({
    displayName: "Swordsman",
    cost: [{type: Resources.PRODUCTION, amount: 25}],
    upkeep: [{type: Resources.GOLD, amount: 1}],
    description: "A basic sword wielder. Better than nothing, but only a little",
    dependencies: [],
    grantsAbilities: [ UnitAbilities.LARGE_SHIELD ]
});
const HALBERDIERS = new Unit({
    displayName: "Halberdiers",
    cost: [{type: Resources.PRODUCTION, amount: 25}],
    upkeep: [{type: Resources.GOLD, amount: 1}],
    description: "",
    dependencies: [],
    grantsAbilities: [ UnitAbilities.FIRST_STRIKE ]
});
const PIKEMEN = new Unit({
    displayName: "Pikemen",
    cost: [{type: Resources.PRODUCTION, amount: 25}],
    upkeep: [{type: Resources.GOLD, amount: 1}],
    description: "",
    dependencies: [],
    grantsAbilities: [ UnitAbilities.NEGATE_FIRST_STRIKE ]
});
const CAVALRY = new Unit({
    displayName: "Cavalry",
    cost: [{type: Resources.PRODUCTION, amount: 25}],
    upkeep: [{type: Resources.GOLD, amount: 1}],
    description: "",
    dependencies: [],
    grantsAbilities: [ UnitAbilities.MOUNTED_MOVEMENT ]
});
const BOWMEN = new Unit({
    displayName: "Bowmen",
    cost: [{type: Resources.PRODUCTION, amount: 25}],
    upkeep: [{type: Resources.GOLD, amount: 1}],
    description: "",
    dependencies: [],
    grantsAbilities: [ UnitAbilities.PROJECTILE_ATTACK ]
});
const SHAMANS = new Unit({
    displayName: "Shamans",
    cost: [{type: Resources.PRODUCTION, amount: 25}],
    upkeep: [{type: Resources.GOLD, amount: 1}],
    description: "",
    dependencies: [],
    grantsAbilities: [ UnitAbilities.RECOVERY_HEALING ]
});
const PRIESTS = new Unit({
    displayName: "Priests",
    cost: [{type: Resources.PRODUCTION, amount: 25}],
    upkeep: [{type: Resources.GOLD, amount: 1}],
    description: "",
    dependencies: [],
    grantsAbilities: [ UnitAbilities.COMBAT_HEALING ]
});
const MAGICIANS = new Unit({
    displayName: "Magicians",
    cost: [{type: Resources.PRODUCTION, amount: 25}],
    upkeep: [{type: Resources.GOLD, amount: 1}],
    description: "",
    dependencies: [],
    grantsAbilities: [ UnitAbilities.MAGIC_ATTACK ]
});
const ENGINEERS = new Unit({
    displayName: "Engineers",
    cost: [{type: Resources.PRODUCTION, amount: 25}],
    upkeep: [{type: Resources.GOLD, amount: 1}],
    description: "",
    dependencies: [],
    grantsAbilities: [ UnitAbilities.CONSTRUCT_ROADS ]
});
const CATAPULTS = new Unit({
    displayName: "Catapults",
    cost: [{type: Resources.PRODUCTION, amount: 25}],
    upkeep: [{type: Resources.GOLD, amount: 1}],
    description: "",
    dependencies: [],
    grantsAbilities: [ UnitAbilities.WALL_CRUSHER ]
});

const Units = {
    SWORDSMAN: SWORDSMAN,
    HALBERDIERS: HALBERDIERS,
    PIKEMEN: PIKEMEN,
    CAVALRY: CAVALRY,
    BOWMEN: BOWMEN,
    SHAMANS: SHAMANS,
    PRIESTS: PRIESTS,
    MAGICIANS: MAGICIANS,
    ENGINEERS: ENGINEERS,
    CATAPULTS: CATAPULTS
}

const keys = Object.keys(Units);
Units.getValues = function() {
    return keys.map(item => Units[item]);
};

export default Units;

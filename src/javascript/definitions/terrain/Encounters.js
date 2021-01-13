
import Encounter from "../../classes/terrain/Encounter.js";
import Nodes from "./Nodes.js";
import Towers from "./TowerOfWizardrys.js";

// -- NODES --
const NODE_LIFE = new Encounter({
    displayName: Nodes.LIFE_NODE.displayName,
    description: "",
    becomes: Nodes.LIFE_NODE
});

const NODE_CHAOS = new Encounter({
    displayName: Nodes.LIFE_NODE.displayName,
    description: "",
    becomes: Nodes.CHOAS_NODE
});

// -- TOWERS --
const TOWER_OF_WIZARDRY_MYRROR = new Encounter({
    displayName: Towers.TOWER_OF_WIZARDRY_MYRROR.displayName,
    description: "",
    becomes: Towers.TOWER_OF_WIZARDRY_MYRROR
});

// -- Adventures --
// These do not generate TerrainSpecials
const LAIR = new Encounter({
    displayName: "Lair",
    description: ""
});
const CAVE = new Encounter({
    displayName: "Cave",
    description: ""
});
const KEEP = new Encounter({
    displayName: "Keep",
    description: ""
});
const ANCIENT_TEMPLE = new Encounter({
    displayName: "Ancient Temple",
    description: ""
});
const FALLEN_TEMPLE = new Encounter({
    displayName: "Fallen Temple",
    description: ""
});
const RUINS = new Encounter({
    displayName: "Ruins",
    description: ""
});
const DUNGEON = new Encounter({
    displayName: "Dungeon",
    description: ""
});


// -- And the summary

const Encounters = {
    // Nodes
    NODE_LIFE: NODE_LIFE,
    NODE_CHAOS: NODE_CHAOS,
    // Towers
    TOWER_OF_WIZARDRY_MYRROR: TOWER_OF_WIZARDRY_MYRROR,
    // Adventures
    LAIR: LAIR,
    CAVE: CAVE,
    KEEP: KEEP,
    ANCIENT_TEMPLE: ANCIENT_TEMPLE,
    FALLEN_TEMPLE: FALLEN_TEMPLE,
    RUINS: RUINS,
    DUNGEON: DUNGEON
}

const keys = Object.keys(Encounters);
Encounters.getValues = function() {
    return keys.map(item => Encounters[item]);
};

export default Encounters;





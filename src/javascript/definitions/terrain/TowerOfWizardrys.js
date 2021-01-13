import Node from "../../classes/terrain/TowerOfWizardry.js"

const TOWER_OF_WIZARDRY_MYRROR = new TowerOfWizardry({
    displayName: "Tower of Wizardry: Myrror",
    description: ""
});

const Towers = {
    TOWER_OF_WIZARDRY_MYRROR: TOWER_OF_WIZARDRY_MYRROR
};

const keys = Object.keys(Towers);
Towers.getValues = function() {
    return keys.map(item => Towers[item]);
};
Towers.getKeys = function() {
    return keys;
};

export default Towers;
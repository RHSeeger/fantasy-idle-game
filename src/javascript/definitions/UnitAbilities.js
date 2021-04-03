
import UnitAbility from "../classes/UnitAbility.js"
import Resources from "./Resources.js"

const FIRST_STRIKE = new UnitAbility({
    displayName: "First Strike",
    description: "Each round when fighting, attacks hit and deal damage first. If it does enough to kill the enemy unit, that unit does not get to attack during the round."
});
const ARMOR_PIERCING = new UnitAbility({
    displayName: "Armor Piercing",
    description: "Attacks ignore part of the enemies' armor"
});
const LARGE_SHIELD = new UnitAbility({
    displayName: "Large Shield",
    description: "Grants an extra 2 armor vs ranged attacks"
});
const NEGATE_FIRST_STRIKE = new UnitAbility({
    displayName: "Negate First Strike",
    description: "Grants immunity to the first strike ability. Those attacks still do damage, but a normal response attack is made"
});
const MISSILE_IMMUNITY = new UnitAbility({
    displayName: "Missile Immunity",
    description: "Armor is doubled versus projectile attacks"
});
const CONSTRUCT_ROADS = new UnitAbility({
    displayName: "Construct Roads",
    description: "Not sure yet... still trying to figure out the mechanic for this. I expect it will mean any units are available to help during battles"
});
const MOUNTED_MOVEMENT = new UnitAbility({
    displayName: "Mounted Movement",
    description: "Grants the ability to move further every turn, increasing the chance of an encounter."
});
const PROJECTILE_ATTACK = new UnitAbility({
    displayName: "Projectile Attack",
    description: "Units are equipped with a projectile weapon, such as a bow. They get one free attack at the beginning of the battle. If the opponent also has a ranged attack, they both get to attack."
});
const MAGIC_ATTACK = new UnitAbility({
    displayName: "Magic Attack",
    description: "Units has the ability to hurl bolts of magical energy at enemies. They get one free attack at the beginning of the battle. If the opponent also has a ranged attack, they both get to attack."
});
const WALL_CRUSHER = new UnitAbility({
    displayName: "Wall Crusher",
    description: "When attacking towns, opposing units gain no benefit from the walls"
});
const RECOVERY_HEALING = new UnitAbility({
    displayName: "Recovery Healing",
    description: "Unit automatically recover all health after battle"
});
const COMBAT_HEALING = new UnitAbility({
    displayName: "Combat Healing",
    description: "Units slowly regain health during battle"
});

const UnitAbilities = {
    FIRST_STRIKE: FIRST_STRIKE,
    ARMOR_PIERCING: ARMOR_PIERCING,
    LARGE_SHIELD: LARGE_SHIELD,
    NEGATE_FIRST_STRIKE: NEGATE_FIRST_STRIKE,
    MISSILE_IMMUNITY: MISSILE_IMMUNITY,
    CONSTRUCT_ROADS: CONSTRUCT_ROADS,
    MOUNTED_MOVEMENT: MOUNTED_MOVEMENT,
    PROJECTILE_ATTACK: PROJECTILE_ATTACK,
    MAGIC_ATTACK: MAGIC_ATTACK,
    WALL_CRUSHER: WALL_CRUSHER,
    RECOVERY_HEALING: RECOVERY_HEALING,
    COMBAT_HEALING: COMBAT_HEALING
}

const keys = Object.keys(UnitAbilities);
UnitAbilities.getValues = function() {
    return keys.map(item => UnitAbilities[item]);
};

export default UnitAbilities;

/**
 * Commands for combat between a user's forces and enemy forces
 *
 * Still a work in progress
 */

/*
 * A combat of forces against forces
 */
function battle(userCombatants, enemyCombatants) {
    // first, each unit with a ranged attack gets one attack before those without it can attack
    // TODO: maybe we should allow more than one ranged attack, based on something
    userCombatants
        .filter(combatant -> combatant.hasRangedAttack)
        .forEach(combatant -> attackRanged(combatant, pickOneOf(enemyCombatants)));
    enemyCombatants
        .filter(combatant -> combatant.hasRangedAttack)
        .forEach(combatant -> attackRanged(combatant, pickOneOf(userCombatants)));

    // and now we move into normal combat
    // each of the user's combatants picks an enemy to fight... iterating through the enemy units in order
    // if there are more enemy units than there are user units, the extras just get to "wait" until the ones before them are dead


    var index = 0;
    userCombatants.forEach(userCombatant -> {
        const ememyCombatant = pickNthTarget(enemyCombatants, index);
        attack(userCombatant, ememyCombatant);
        index += 1;
    });

    // TODO: apply combat healing
    // TODO: loop and do that ^ until either there's no valid user combatants or no valid enemy combatants
}

function attackRanged(userCombatant, enemyCombatant) {
    if (enemyCombatant.has(missile_immunity)) {
        return;
    }

    // TODO: this
    // LARGE_SHIELD: LARGE_SHIELD, - target gets +defense against ranged
}

/*
 * Picks the nth valid target from the enemy combantants, where n = index mod number_of_valid_combatants
 */
function pickNthTarget(enemyCombatants, index) {
    const validCombatants = enemyCombatants
        .filter(combatant -> combatant.isAlive);
    return validCombatants[index % validCombatants.length];
}

/*
 * A single attack
 */
function attack(userCombatant, enemyCombatant) {
    if (canFirstStrike(userCombatant, enemyCombatant)) {
        dealDamage(userCombatant, enemyCombatant);
        if (enemyCombatant.isDead()) {
            return;
        }
        dealDamage(enemyCombatant, userCombatant);
    } else if (canFirstStrike(enemyCombatant, userCombatant)) {
        dealDamage(enemyCombatant, userCombatant);
        if (userCombatant.isDead()) {
            return;
        }
        dealDamage(userCombatant, enemyCombatant);
    } else {
        dealDamage(userCombatant, enemyCombatant);
        dealDamage(enemyCombatant, userCombatant);
    }
}

function canFirstStrike(attackingCombatant, targetCombatant) {
    return (attackingCombatant.has(firstStrike) && !targetCombatant.has(firstStrike) && !targetCombatant.has(negateFirstStrike));
}

/*
 * Things to pay attention to
 ARMOR_PIERCING: ARMOR_PIERCING, - halves target armor? or some other modified
 WALL_CRUSHER: WALL_CRUSHER, - target loses any "behind a wall" defense

 */
function dealDamage(attackingCombatant, targetCombatant) {

}
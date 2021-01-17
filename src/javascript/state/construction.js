/**
 * Functionality for updating construction information for a game turn
 *
 * Projects can include
 * - buildings
 * - units
 * - special projects - Housing or Trade Goods
 */

import * as ProductionUtils from '../utils/production-utils.js';
import Projects from '../definitions/Projects.js';
import Resources from '../definitions/Resources.js';

/**
 * Updates the population info for one game turn
 * TODO: implement me
 */
function update(oldUserState, newUserState) {
    const project = oldUserState.construction.getCurrentProject();
    if (project === Projects.HOUSING) {
        // this will be handled by population.js
        return;
    }

    if (project === Projects.TRADE_GOODS) {
        // this will be handled by whatever handles gold
        return;
    }

    const progress = oldUserState.construction.progress;
    const totalCost = project.cost
        .filter(cost => cost.type === Resources.PRODUCTION)
        .map(cost => cost.amount)
        || 0; // everything should have a production cost, but just in case
    const progressRequired = totalCost - progress;
    const production = ProductionUtils.calculateProductionGenerated(oldUserState);

    if (production < progressRequired) {
        // It's still not done, update the progress and return
        console.log("Completing " + production + " production points of " + project.displayName + ", "
            + (progressRequired - production) + " of " + totalCost + " remaining");
        newUserState.construction.progress = newUserState.construction.progress + production;
        return;
    }

    // Project is completed, update things
    console.log("Completed construction of project: " + project.displayName);
    newUserState.construction.removeFromQueue(project);
    newUserState.construction.complete(project);
    newUserState.construction.progress = 0;
}


/** EXPORTS **/

export { update };

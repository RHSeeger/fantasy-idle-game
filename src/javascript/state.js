/*
 * Holds the current state of the game, and methods to update that state for each turn
 */

import * as Construction from "./state/construction.js";
import * as Population from "./state/population.js";
import * as ProductionUtils from "./utils/production-utils.js";

/**
 * Updates the user data, based on construction and other activities
 */
function update(gameState) {
    if (gameState.paused === true) {
        return;
    }

    const oldUserState = gameState.player;
    const newUserState = oldUserState.clone();

    // update resources
    updateGold(oldUserState, newUserState);

    // update assets
    Population.update(oldUserState, newUserState);
    Construction.update(oldUserState, newUserState);

    gameState.player = newUserState;
};

function updateGold(oldUserState, newUserState) {
    // TODO: should all these functions be using the oldUserState?
    const goldProduced = ProductionUtils.calculateGoldProduced(oldUserState);
    const goldUpkeep = ProductionUtils.calculateGoldUpkeep(oldUserState);
    const goldIncome = goldProduced - goldUpkeep;

    newUserState.resources.gold = oldUserState.resources.gold + goldIncome;
};

function updateFood(oldUserState, newUserState) {

};

function getGame() {
    return document.game;
}

function getUserState() {
    //return document.game.userState;
    return getGame().userState;
}

function getDebugSpeed() {
    //return document.game.debugSpeed;
    return getGame().debugSpeed;
}

function isPaused() {
    return getGame().paused === true;
}

// -- EXPORTS --
export {
    update,
    getGame,
    getUserState,
    getDebugSpeed,
    isPaused };

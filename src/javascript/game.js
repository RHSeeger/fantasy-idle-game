
// Certain values need to be setup before we include other modules, since they rely on them
const game = {};
document.game = game;
game.userState = {
    gold: 0
};
game.paused = false;
game.debugSpeed = 1;

import * as UI from './ui.js';


$(document).ready(function() {
    const UPDATE_INTERVAL = 10000; // 1 second
    update(); // start out with a filled in display
    var updateIntervalId = window.setInterval(update, UPDATE_INTERVAL);
    console.log("Game setup complete");
});

function cloneUserState(userState) {
    return JSON.parse(JSON.stringify(userState));
};

function update() {
    if (game.pause === true) {
        return;
    }

    const oldUserState = getGame().userState;
    const newUserState = cloneUserState(oldUserState);

    updateResources(oldUserState, newUserState);
    updateAssets(oldUserState, newUserState);

    getGame().userState = newUserState;
    UI.updateDisplay();
};

function updateResources(oldUserState, newUserState) {
    //updateFood(oldUserState, newUserState);
    updateGold(oldUserState, newUserState);
};

function updateAssets(oldUserState, newUserState) {
    updatePopulation(oldUserState, newUserState);
};

//const updateFood = function(oldUserState, newUserState) {
//
//};

function updateGold(oldUserState, newUserState) {

};

function updatePopulation(oldUserState, newUserState) {

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
export { getGame, getUserState, getDebugSpeed, isPaused };

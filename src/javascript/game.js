
// Certain values need to be setup before we include other modules, since they rely on them
const game = {};
document.game = game;
game.userState = {
    gold: 0,
    cityName: 'York'
};
game.paused = false;
game.debugSpeed = 1;

import * as UI from './ui.js';
import * as Tabs from './ui/tabs.js';
import * as ConstructionModule from './ui/construction-module.js';
import * as Resources from './resources.js';
import * as Population from './population.js';
import * as Construction from './construction.js';

const UPDATE_INTERVAL_TURN = 10000; // one turn every 10 seconds
const UPDATE_INTERVAL_UI = 1000; // update the ui every 1 second

$(document).ready(function() {
    Tabs.initialize();
    ConstructionModule.initialize();

    updateUi(); // start out with a filled in display
    // TODO: Make these take into account changes to the update speed dynamically
    var updateIntervalIdTurn = window.setInterval(updateGameTurn, UPDATE_INTERVAL_TURN);
    var updateIntervalIdUi = window.setInterval(updateUi, UPDATE_INTERVAL_UI);

    console.log("Game setup complete");
});

function updateGameTurn() {
    if (game.pause === true) {
        return;
    }

    const oldUserState = getGame().userState;
    const newUserState = cloneUserState(oldUserState);

    // update resources
    updateGold(oldUserState, newUserState);

    // update assets
    Population.update(oldUserState, newUserState);
    Construction.update(oldUserState, newUserState);

    getGame().userState = newUserState;
};

function updateUi() {
    UI.updateDisplay();
}

function cloneUserState(userState) {
    return JSON.parse(JSON.stringify(userState));
};

//const updateFood = function(oldUserState, newUserState) {
//
//};

function updateGold(oldUserState, newUserState) {
    // TODO: should all these functions be using the oldUserState?
    const goldProduced = Resources.calculateGoldProduced();
    const goldUpkeep = Resources.calculateGoldUpkeep();
    const goldIncome = goldProduced - goldUpkeep;

    newUserState.gold = oldUserState.gold + goldIncome;
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



//import * as Resources from './resources.js';
//import * as Population from './population.js';
//import * as Construction from './construction.js';
//
//import * as Tabs from './ui/tabs.js';
//import * as ConstructionModule from './ui/construction-module.js';
import * as Definitions from "./definitions.js";
import GameState from "./classes/GameState.js";
import * as State from "./state.js";
import * as UI from './ui.js';
import * as StateUtils from './state/state-utils.js';

const UPDATE_INTERVAL_TURN = 10000; // one turn every 10 seconds
const UPDATE_INTERVAL_UI = 1000; // update the ui every 1 second

/*
UI = the display... so Ui.update updates the display
State = the game state, so <what>.update updates the game state.. ie, takes a "turn" in the game
         State.Construction.update updates the state of what is being constructed
Definitions = the defined asset types, such as projects, units, land types, etc
         I do like this this name
 */
$(document).ready(function() {
    //State.initialize();
    UI.initialize();

    const gameState = new GameState();
    StateUtils.setGameState(gameState);

    // TODO: load player from storage, if available

    UI.update(gameState) // start out with a filled in display

    // TODO: Make these take into account changes to the update speed dynamically
    var updateIntervalIdTurn = window.setInterval(function() { State.update(gameState); }, UPDATE_INTERVAL_TURN);
    var updateIntervalIdUi = window.setInterval(function() { UI.update(gameState); }, UPDATE_INTERVAL_UI);

    console.log("Game setup complete");
});

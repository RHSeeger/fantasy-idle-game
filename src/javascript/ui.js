
//import * as Buildings from './buildings.js';
//import * as Population from './population.js';
//import * as Game from './game.js';
//import * as Races from './races.js';
//import * as Resources from './resources.js';

import * as Tabs from './ui/tabs.js';
import * as PopulationModule from './ui/population-module.js';
import * as ResourcesModule from './ui/resources-module.js';
import * as ConstructionModule from './ui/construction-module.js';

function initialize() {
    Tabs.initialize();

    //MainModule.initialize(); // The main tab, which recursively initializes the things on it
    ConstructionModule.initialize(); // The construction tab, which recursively...
}

function update(gameState) {
    const userState = gameState.player;
    updateCityTitleDisplay(userState);
    PopulationModule.update(userState);
    ResourcesModule.update(userState);
    ConstructionModule.update(userState);
}

function updateCityTitleDisplay(userState) {
    const citySizeLabel = "Capital";
    const cityName = userState.cityName;

    const $cityTitleModule = $('.main .city-title');
    $cityTitleModule.text(citySizeLabel + " of " + cityName);
}


// -- EXPORTS --

export {
    initialize,
    update
    };

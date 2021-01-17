
//import * as Buildings from './buildings.js';
//import * as Population from './population.js';
//import * as Game from './game.js';
//import * as Races from './races.js';
//import * as Resources from './resources.js';

import * as Tabs from './ui/tabs.js';
import * as PopulationModule from './ui/population-module.js';
import * as ResourcesModule from './ui/resources-module.js';
import * as ConstructionModule from './ui/construction-module.js';
import * as State from './state/state-utils.js';
import * as MainBuildingsModule from './ui/main-buildings-module.js';

function initialize() {
    Tabs.initialize();

    //MainModule.initialize(); // The main tab, which recursively initializes the things on it
    ConstructionModule.initialize(); // The construction tab, which recursively...
}

function update() {
    updateCityTitleDisplay();
    PopulationModule.update();
    ResourcesModule.update();
    ConstructionModule.update();
    MainBuildingsModule.update();
}

function updateCityTitleDisplay() {
    const playerState = State.getPlayerState();

    const citySizeLabel = "Capital";
    const cityName = playerState.city.cityName;

    const $cityTitleModule = $('.main .city-title');
    $cityTitleModule.text(citySizeLabel + " of " + cityName);
}


// -- EXPORTS --

export {
    initialize,
    update
    };

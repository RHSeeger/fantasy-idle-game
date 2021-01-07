
import * as Buildings from './buildings.js';
import * as Population from './population.js';
import * as Game from './game.js';
import * as Races from './races.js';
import * as Resources from './resources.js';
import * as PopulationModule from './ui/population-module.js';
import * as ResourcesModule from './ui/resources-module.js';
import * as ConstructionModule from './ui/construction-module.js';

const updateDisplay = function () {
    updateCityTitleDisplay();
    PopulationModule.update();
    ResourcesModule.update();
    ConstructionModule.update();
}

function updateCityTitleDisplay() {
    const citySizeLabel = "Capital";
    const cityName = Game.getUserState().cityName;

    const $cityTitleModule = $('.main .city-title');
    $cityTitleModule.text(citySizeLabel + " of " + cityName);
}

function getNumOptionalFarmers() {

}

function getNumWorkers() {

}

function getNumRioters() {

}


// -- EXPORTS --

export { updateDisplay };

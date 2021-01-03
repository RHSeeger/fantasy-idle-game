
import * as Buildings from './buildings.js';
import * as Population from './population.js';
import * as Game from './game.js';
import * as Races from './races.js';

//const $populationElement =  $('.population-module .count-module');
const $populationCountModule = $('.population-module .count-module');
//const $wealthElement =  $('#stats div.wealth')
const $workersElement =  $('.population-module .workers-module');
const $primaryRaceModule = $('.population-module .race-module');
const $cityTitleModule = $('.main .city-title');

const updateDisplay = function () {
    updateCityTitleDisplay();
    updateRaceDisplay();
    updatePopulationDisplay();
    updateWealthDisplay();
    updateWorkersDisplay();
}

function updateCityTitleDisplay() {
    const citySizeLabel = "Capital";
    const cityName = Game.getUserState().cityName;
    $cityTitleModule.text(citySizeLabel + " of " + cityName);
}

function updateRaceDisplay() {
    const race = Population.getPrimaryRace();
    const raceDisplayName = Races.RACE_DATA[race].displayName;
    $primaryRaceModule.text(raceDisplayName);
}

const updatePopulationDisplay = function() {
    const count = Math.floor(Population.getPopulationCount()).toLocaleString();
    const growthRate = Population.getPopulationGrowthRate();
    $populationCountModule.find('span.value').text(count + " ("
        + (growthRate >= 0 ? "+" : "")
        + growthRate + ")");
}

const updateWealthDisplay = function() {
   // $wealthElement.find('span.value').text(document.game.userState.gold);
}

const updateWorkersDisplay = function() {
    const numRequiredFarmers = Population.getNumRequiredFarmers();
    const numOptionalFarmers = Population.getNumOptionalFarmers();
    const numRioters = 1;
    const numWorkers = Population.getPopulationUnits() - (numRequiredFarmers + numOptionalFarmers + numRioters);

    $workersElement.empty();

    for (var i=0; i<numRequiredFarmers; i++) {
        const icon = $("<span />", {
            'class': 'farmer subsistance-farmer computer-controlled'
        });
        $workersElement.append(icon);
    }
    for (var i=0; i<numOptionalFarmers; i++) {
        const icon = $("<span />", {
            'class': 'farmer surplus-farmer player-controlled'
        });
        $workersElement.append(icon);
    }
    for (var i=0; i<numWorkers; i++) {
        const icon = $("<span />", {
            'class': 'worker player-controlled'
        });
        $workersElement.append(icon);
    }
    for (var i=0; i<numRioters; i++) {
        const icon = $("<span />", {
            'class': 'rebel not-controlled'
        });
        $workersElement.append(icon);
    }

}



function getNumOptionalFarmers() {

}

function getNumWorkers() {

}

function getNumRioters() {

}


// -- EXPORTS --

export { updateDisplay };

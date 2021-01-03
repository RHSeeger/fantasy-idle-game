
import * as Buildings from './buildings.js';
import * as Population from './population.js';
import * as Game from './game.js';
import * as Races from './races.js';
import * as Resources from './resources.js';

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
    updateGoldDisplay();
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

function updateGoldDisplay() {
    const goldProduced = Resources.calculateGoldProduced();
    const goldUpkeep = Resources.calculateGoldUpkeep();

    const goldIncome = goldProduced - goldUpkeep;

    console.log("Gold: produced=" + goldProduced + ", upkeep=" + goldUpkeep + ", income=" + goldIncome);
    // The first grouping is the upkeep
    const $moduleContent = $('.main .effects-container .resources-module .gold-module');
    $moduleContent.empty();

    var currUpkeep = goldUpkeep;
    while (currUpkeep >= 10) {
        const icon = $("<span />", {
            'class': 'gold gold-upkeep gold-10'
        });
        $moduleContent.append(icon);
        currUpkeep -= 10;
    }
    while (currUpkeep >= 1) {
        const icon = $("<span />", {
            'class': 'gold gold-upkeep gold-1'
        });
        $moduleContent.append(icon);
        currUpkeep -= 1;
    }

    // The second grouping is the income (or deficit)
    const incomeType = goldIncome >= 0 ? "gold-income" : "gold-deficit";
    var currIncome = Math.abs(goldIncome);
    while (currIncome >= 10) {
        const icon = $("<span />", {
            'class': 'gold ' + incomeType + ' gold-10'
        });
        $moduleContent.append(icon);
        currIncome -= 10;
    }
    while (currIncome >= 1) {
        const icon = $("<span />", {
            'class': 'gold ' + incomeType + ' gold-1'
        });
        $moduleContent.append(icon);
        currIncome -= 1;
    }

    // TODO: put the actual income/deficit as text on the right
}





function getNumOptionalFarmers() {

}

function getNumWorkers() {

}

function getNumRioters() {

}


// -- EXPORTS --

export { updateDisplay };

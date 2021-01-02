
import * as Buildings from './buildings.js';
import * as Population from './population.js';
import * as Game from './game.js';

const $populationElement = $('#stats div.population');
const $wealthElement =  $('#stats div.wealth')
const $workersElement =  $('#stats div.workers')

const updateDisplay = function () {
    updatePopulationDisplay();
    updateWealthDisplay();
    updateWorkersDisplay();
}

const updatePopulationDisplay = function() {
    const count = Math.floor(Population.getPopulationCount()).toLocaleString();
    $populationElement.find('span.value').text(Population.getPopulationUnits() + " (" + count + ")");
}

const updateWealthDisplay = function() {
    $wealthElement.find('span.value').text(document.game.userState.gold);
}

const updateWorkersDisplay = function() {
    const numRequiredFarmers = Population.getNumRequiredFarmers();
    const numOptionalFarmers = Population.getNumOptionalFarmers();
    const numRioters = 1;
    const numWorkers = Population.getPopulationUnits() - (numRequiredFarmers + numOptionalFarmers + numRioters);

    const $valueElement = $workersElement.find('span.value');
    $valueElement.empty();

    for (var i=0; i<numRequiredFarmers; i++) {
        const icon = $("<span />", {
            'class': 'farmer subsistance-farmer'
        });
        $valueElement.append(icon);
    }
    for (var i=0; i<numOptionalFarmers; i++) {
        const icon = $("<span />", {
            'class': 'farmer surplus-farmer'
        });
        $valueElement.append(icon);
    }
    for (var i=0; i<numWorkers; i++) {
        const icon = $("<span />", {
            'class': 'worker'
        });
        $valueElement.append(icon);
    }
    for (var i=0; i<numRioters; i++) {
        const icon = $("<span />", {
            'class': 'rebel'
        });
        $valueElement.append(icon);
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

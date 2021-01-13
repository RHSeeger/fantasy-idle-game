
//import * as Population from '../population.js';
//import * as Races from '../races.js';
//// Constants
//import { RACES, RACE_DATA } from '../races.js';

import * as Population from '../state/population.js';

function update(userState) {
    updateRaceDisplay(userState);
    updatePopulationDisplay(userState);
    updateWorkersDisplay(userState);
}

function updateRaceDisplay(userState) {
    const $primaryRaceModule = $('.population-module .race-module');
    $primaryRaceModule.text(userState.city.primaryRace.displayName);
}

const updatePopulationDisplay = function(userState) {
    const count = Math.floor(userState.population.count).toLocaleString();
    const growthRate = Population.calculatePopulationGrowthRate(userState);

    const $populationCountModule = $('.population-module .count-module');
    $populationCountModule.find('span.value').text(count + " ("
        + (growthRate >= 0 ? "+" : "")
        + growthRate + ")");
}

const updateWorkersDisplay = function(userState) {
    const numRequiredFarmers = Population.calculateNumRequiredFarmers(userState);
    const numOptionalFarmers = userState.population.numOptionalFarmers;
    const numRioters = Population.calculateNumRioters();
    const numUnits = Population.calculatePopulationUnits(userState);
    const numWorkers = numUnits - (numRequiredFarmers + numOptionalFarmers + numRioters);

    const $workersElement =  $('.population-module .workers-widget');
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

export { update };

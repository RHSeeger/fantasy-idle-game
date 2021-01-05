
import * as Population from '../population.js';
import * as Races from '../races.js';
// Constants
import { RACES, RACE_DATA } from '../races.js';

function update() {
    updateRaceDisplay();
    updatePopulationDisplay();
    updateWorkersDisplay();
}

function updateRaceDisplay() {
    const race = Population.getPrimaryRace();
    const raceDisplayName = RACE_DATA[race].displayName;

    const $primaryRaceModule = $('.population-module .race-module');
    $primaryRaceModule.text(raceDisplayName);
}

const updatePopulationDisplay = function() {
    const count = Math.floor(Population.getPopulationCount()).toLocaleString();
    const growthRate = Population.getPopulationGrowthRate();

    const $populationCountModule = $('.population-module .count-module');
    $populationCountModule.find('span.value').text(count + " ("
        + (growthRate >= 0 ? "+" : "")
        + growthRate + ")");
}

const updateWorkersDisplay = function() {
    const numRequiredFarmers = Population.getNumRequiredFarmers();
    const numOptionalFarmers = Population.getNumOptionalFarmers();
    const numRioters = Population.calculateNumRioters();
    const numWorkers = Population.getPopulationUnits() - (numRequiredFarmers + numOptionalFarmers + numRioters);

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

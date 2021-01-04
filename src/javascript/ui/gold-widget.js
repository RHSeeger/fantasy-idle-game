/*
 * The gold widget in the resources module
 */

import * as Resources from '../resources.js';
import * as Game from '../game.js';

function update() {
    const $widget = $('.main .effects-container .resources-module .gold-widget');
    const $widgetGraphic = $widget.find('.graphic-value');
    const $widgetText = $widget.find('.text-value');

    const goldCurrent = Game.getUserState().gold;
    const goldProduced = Resources.calculateGoldProduced();
    const goldUpkeep = Resources.calculateGoldUpkeep();
    const goldIncome = goldProduced - goldUpkeep;

    // Update the text display: current gold (change)
    $widgetText.text(goldCurrent.toLocaleString() + " (" + (goldIncome >= 0 ? "+" : "") + goldIncome + ")");

    $widgetGraphic.empty();

    // The first grouping is the upkeep
    var currUpkeep = goldUpkeep;
    while (currUpkeep >= 10) {
        const icon = $("<span />", {
            'class': 'gold gold-upkeep gold-10'
        });
        $widgetGraphic.append(icon);
        currUpkeep -= 10;
    }
    while (currUpkeep >= 1) {
        const icon = $("<span />", {
            'class': 'gold gold-upkeep gold-1'
        });
        $widgetGraphic.append(icon);
        currUpkeep -= 1;
    }

    // The second grouping is the income (or deficit)
    const incomeType = goldIncome >= 0 ? "gold-income" : "gold-deficit";
    var currIncome = Math.abs(goldIncome);
    while (currIncome >= 10) {
        const icon = $("<span />", {
            'class': 'gold ' + incomeType + ' gold-10'
        });
        $widgetGraphic.append(icon);
        currIncome -= 10;
    }
    while (currIncome >= 1) {
        const icon = $("<span />", {
            'class': 'gold ' + incomeType + ' gold-1'
        });
        $widgetGraphic.append(icon);
        currIncome -= 1;
    }
}


export { update };

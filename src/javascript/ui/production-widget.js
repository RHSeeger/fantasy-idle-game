
/*
 * The production widget in the resources module
 */

import * as ProductionUtils from '../utils/production-utils.js';
import * as State from '../state/state-utils.js';

function update() {
    const userState = State.getPlayerState();

    const $widget = $('.main .effects-container .resources-module .production-widget');
    const $widgetGraphic = $widget.find('.graphic-value');
    const $widgetText = $widget.find('.text-value');

    const production = ProductionUtils.calculateProductionGenerated(userState);

    // Update the text display: current gold (change)
    $widgetText.text(production.toLocaleString());

    $widgetGraphic.empty();

    // The first grouping is the upkeep
    var currentValue = production;
    while (currentValue >= 10) {
        const icon = $("<span />", {
            'class': 'production production-10'
        });
        $widgetGraphic.append(icon);
        currentValue -= 10;
    }
    while (currentValue >= 1) {
        const icon = $("<span />", {
            'class': 'production production-1'
        });
        $widgetGraphic.append(icon);
        currentValue -= 1;
    }

}


export { update };

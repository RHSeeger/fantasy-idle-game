
/*
 * The gold widget in the resources module
 */

import * as Resources from '../resources.js';
import * as Game from '../game.js';

function update() {
    const $widget = $('.main .effects-container .resources-module .production-widget');
    const $widgetGraphic = $widget.find('.graphic-value');
    const $widgetText = $widget.find('.text-value');

    const production = Resources.calculateProductionGenerated();

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

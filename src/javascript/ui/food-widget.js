import * as Resources from '../resources.js';
import * as Game from '../game.js';

function update() {
    const $widget = $('.main .effects-container .resources-module .food-widget');
    const $widgetGraphic = $widget.find('.graphic-value');
    const $widgetText = $widget.find('.text-value');

    const foodProduced = Resources.calculateFoodGenerated();
    const foodUpkeep = Resources.getNumRequiredFood();
    const foodIncome = foodProduced - foodUpkeep;

    // Update the text display: current gold (change)
    $widgetText.text((foodIncome >= 0 ? "+" : "") + foodIncome);

    $widgetGraphic.empty();

    // The first grouping is the upkeep
    var currUpkeep = foodUpkeep;
    while (currUpkeep >= 10) {
        const icon = $("<span />", {
            'class': 'food food-upkeep food-10'
        });
        $widgetGraphic.append(icon);
        currUpkeep -= 10;
    }
    while (currUpkeep >= 1) {
        const icon = $("<span />", {
            'class': 'food food-upkeep food-1'
        });
        $widgetGraphic.append(icon);
        currUpkeep -= 1;
    }

    // The second grouping is the income (or deficit)
    const incomeType = foodIncome >= 0 ? "food-income" : "food-deficit";
    var currIncome = Math.abs(foodIncome);
    while (currIncome >= 10) {
        const icon = $("<span />", {
            'class': 'food ' + incomeType + ' food-10'
        });
        $widgetGraphic.append(icon);
        currIncome -= 10;
    }
    while (currIncome >= 1) {
        const icon = $("<span />", {
            'class': 'food ' + incomeType + ' food-1'
        });
        $widgetGraphic.append(icon);
        currIncome -= 1;
    }
}


export { update };



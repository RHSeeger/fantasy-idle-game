
import * as FoodWidget from './food-widget.js';
import * as ProductionWidget from './production-widget.js';
import * as GoldWidget from './gold-widget.js';

function update() {
    FoodWidget.update();
    ProductionWidget.update();
    GoldWidget.update();
}

export { update };
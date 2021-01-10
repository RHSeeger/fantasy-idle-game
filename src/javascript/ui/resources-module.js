
import * as FoodWidget from './food-widget.js';
import * as ProductionWidget from './production-widget.js';
import * as GoldWidget from './gold-widget.js';

function update(userState) {
    FoodWidget.update(userState);
    ProductionWidget.update(userState);
    GoldWidget.update(userState);
}

export { update };
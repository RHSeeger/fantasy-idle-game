
import * as Population from '../state/population.js';
import Races from '../definitions/Races.js';
import Buildings from '../definitions/Buildings.js';
import Resources from '../definitions/Resources.js';

/*********************************************************************
 * PRODUCTION
 * Production is a perishable resource - any production not used during a turn is lost
 */

function calculateProductionGenerated(userState) {
    return calculateProductionBase(userState) * calculateProductionBonusMultiplier(userState);
}

function calculateProductionBase(userState) {
    const numFarmers = Population.calculateNumRequiredFarmers(userState) + userState.population.numOptionalFarmers;
    const numRioters = Population.calculateNumRioters(userState);
    const numWorkers = Population.calculatePopulationUnits(userState) - (numFarmers + numRioters);

    const primaryRaceWorkerGenerated = (userState.isRace(Races.KLACKON) || userState.isRace(Races.DWARF)) ? 3 : 2;
    const secondaryRacesWorkerGenerated = (userState.hasAdditionalRace(Races.DWARF) ? 0.5 : 0)
        + (userState.hasAdditionalRace(Races.DWARF) ? 0.5 : 0)
    const baseProduction = (numFarmers * 0.5)+ (numWorkers * (primaryRaceWorkerGenerated + secondaryRacesWorkerGenerated))
    return baseProduction;
}

/**
 * A return value of 1 means no modifier, 0.5 would be half production, 2.0 would be double production
 */
function calculateProductionBonusMultiplier(userState) {
    const terrainModifier = 0; // TODO: this
    // mountain, chaos node == +5%
    // desert, forest, hill, nature node == +3%
    // Gaia's Blessing doubles the benefit from forests

    const buildingModified = 0
        + (userState.construction.isCompleted(Buildings.SAWMILL) ? 25 : 0)
        + (userState.construction.isCompleted(Buildings.FORESTERS_GUILD) ? 25 : 0)
        + (userState.construction.isCompleted(Buildings.MINERS_GUILD) ? 50 : 0)
        + (userState.construction.isCompleted(Buildings.MECHANICIANS_GUILD) ? 50 : 0);

    const enchantmentModifiedAdditive = 0; // TODO: this
    // Inspirations = +100%
    const enchantmentModifierMultiplicative = 100; // TODO: this
    // Cursed Lands = 50

    const modifier = ((100 + terrainModifier + buildingModified + enchantmentModifiedAdditive) / 100.0)
        * (enchantmentModifierMultiplicative / 100)

    return modifier;
}

/***********************************************************
 * GOLD
 * Gold is a collectible resource - it accumulates over time
 */

function calculateGoldProduced(userState) {
    const base = calculateBaseGold(userState);
    const bonus = calculateGoldBonus(userState);
    const tradeGoods = calculateTradeGoodGoldBonus(userState);

    // TODO: We don't seem to include excess food here... should we?

    return Math.floor(base * bonus) + tradeGoods;
}

function calculateBaseGold(userState) {
    // From taxes
    const taxRaceMultiplier = userState.isRace(Races.DWARF) ? 2
        : userState.hasAdditionalRace(Races.DWARF) ? 1.25
        : 1;
    const numTaxablePopulationUnits = Population.calculatePopulationUnits(userState) - Population.calculateNumRioters(userState);
    const taxGold = numTaxablePopulationUnits * userState.taxRate * taxRaceMultiplier;

    // From minerals
    const mineralsRaceModifier = userState.isRace(Races.DWARF) ? 2
        : userState.hasAdditionalRace(Races.DWARF) ? 1.25
        : 1;
    const mineralsBuildingModified = userState.construction.isCompleted(Buildings.MINERS_GUILD) ? 1.5 : 1;
    //const mineralValue = [
    //    Terrain.TERRAIN_SPECIALS.SILVER_ORE,
    //    Terrain.TERRAIN_SPECIALS.GOLD_ORE,
    //    Terrain.TERRAIN_SPECIALS.GEMS]
    //    .map(terrainType => {
    //        const count = Terrain.getTerrainSpecialTypeCount(terrainType);
    //        return count * Terrain.TERRAIN_SPECIALS_DATA[terrainType].goldValue;
    //    })
    //    .reduce((accumulator, currentValue) => accumulator + currentValue);
    const mineralValue = 0;
    const mineralGold = mineralValue * mineralsBuildingModified * mineralsRaceModifier;

    return Math.floor(taxGold) + Math.floor(mineralGold);
}

/**
 * Calculate the bonus to gold
 * Calculations are done in percentage amount, then divided by 100 at the end
 */
function calculateGoldBonus(userState) {
    // TODO: account for terrain, race, connected cities (count of cities other than the non-primary), etc
    const tradeBonus = 50;

    const buildingBonus = 0
        + (userState.construction.isCompleted(Buildings.MARKETPLACE) ? 50 : 0)
        + (userState.construction.isCompleted(Buildings.BANK) ? 50 : 0)
        + (userState.construction.isCompleted(Buildings.MERCHANTS_GUILD) ? 100 : 0);

    return (tradeBonus + buildingBonus) / 100.0;
}

/**
 * Trade Goods is a production project which produces gold instead of a building.
 */
function calculateTradeGoodGoldBonus() {
    // TODO: this
    return 0;
}

/**
 * In MOM, this doesn't include units, just buildings... not sure if we want to change that
 */
function calculateGoldUpkeep(userState) {
    // Iterate over each building type and, if the user has completed it, include it's upkeep
    const allBuildings = Object.keys(Buildings).map(building => Buildings[building]);
    const buildingUpkeep = allBuildings
        .filter(building => userState.construction.isCompleted(Buildings.building))
        .map(building => building.getUpkeep(Resources.GOLD))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    // Iterate over units and include the upkeep of the units... unsure how we're handing upkeep yet, to later
    // TODO: unit upkeep

    // Anything else we need gold upkeep from?
    // TODO: figure out if there's anything else

    return buildingUpkeep;
}

/********************************************************
 * FOOD
 * Food is a perishable resource - any food not used during a turn is converted to gold
 */

function calculateNumRequiredFood(userState) {
    // It's pretty much always one food per unit, unless we have some modifier
    // In theory, each normal unit uses one food too... but not sure how we're handling units yet
    // TODO: add in the amount used by normal units (ie, combat units)
    return Population.calculatePopulationUnits(userState);
}

/**
 * Returns the amount of food generated by the various source
 * - base food level (the the land, etc)
 * - required farmers + optional farmers
 * - other buildings and the like
 * There's 2 categories of produced food
 * - weighted - food generation that, if over the base food level, if halved
 * - unweighted - food generation that is not reduced by being over the base food level
 */
function calculateFoodGenerated(userState) {
    var baseFoodLevel = Population.calculateBaseFoodLevel(userState);

    const foodPerFarmer = Population.calculateFoodPerFarmer(userState);
    const totalFarmers = Population.calculateNumRequiredFarmers(userState) + userState.population.numOptionalFarmers;

    // The amount of farmed and weighted produced food if every farmer is working at max production
    const maxFarmedFood = totalFarmers * foodPerFarmer;
    const maxWeightedFood = maxFarmedFood + (userState.construction.isCompleted(Buildings.FORESTERS_GUILD) ? 2 : 0);

    // The amount of weighted food generated after reducing by half the amount over the base food level
    const weightedFood = (maxWeightedFood <= baseFoodLevel) ? baseFoodLevel
        : maxWeightedFood - ((maxWeightedFood - baseFoodLevel) / 2.0);

    // Now we move on to the unweighted food generation types
    const granaryFood = userState.construction.isCompleted(Buildings.GRANARY) ? 2 : 0;
    const marketFood = userState.construction.isCompleted(Buildings.FARMERS_MARKET) ? 3 : 0;
    const wildGameModifier = 1; //TODO:  2 for each Wild game in the city's catchment area
    const unweightedFood = (granaryFood + marketFood) * wildGameModifier;

    const totalFoodProduced = baseFoodLevel + weightedFood + unweightedFood;

    //console.log("numRequiredFarmers = [" + getNumRequiredFarmers() + "]"
    //    + ", numOptionalFarmers = [" + getNumOptionalFarmers() + "]"
    //    + ", foodPerFarmer = [" + foodPerFarmer + "]"
    //    + ", numFarmedFood = [" + farmedFoodIfAllFullProduction + "]"
    //    + ", baseFoodLevel = [" + baseFoodLevel + "]"
    //    + ", producedFood = [" + producedFood + "]"
    //    + ", totalFoodProduced = [" + totalFoodProduced + "]");

    return totalFoodProduced;
}


export {
    calculateProductionGenerated,
    calculateGoldProduced,
    calculateGoldUpkeep,
    calculateFoodGenerated,
    calculateNumRequiredFood
    };
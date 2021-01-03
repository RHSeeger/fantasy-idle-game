
import * as Population from './population.js';
import * as Miscellaneous from './miscellaneous.js';
import * as Races from './races.js';
import * as Terrain from './terrain.js';
import * as Buildings from './buildings.js';

/**
 * FOOD
 * Food is a perishable resource - any food not used during a turn is converted to gold
 */

function getNumRequiredFood() {
    // It's pretty much always one food per unit, unless we have some modifier
    // In theory, each normal unit uses one food too... but not sure how we're handling units yet
    // TODO: add in the amount used by normal units (ie, combat units)
    return Population.getPopulationUnits();
}

/**
 * GOLD
 * Gold is a collectible resource - it accumulates over time
 */
function calculateGoldProduced() {
    const base = calculateBaseGold();
    const bonus = calculateGoldBonus();
    const tradeGoods = calculteTradeGoodGoldBonus();

    return Math.floor(base * bonus) + tradeGoods;
}

function calculateBaseGold() {
    // From taxes
    const taxRaceMultiplier = Population.getPrimaryRace() == Races.RACES.dwarf ? 2
        : Population.getSecondaryRaces().includes(Races.RACES.dwarf) ? 1.25
        : 1;
    const numTaxablePopulationUnits = Population.getPopulationUnits() - Population.getPopulationRebelUnits();
    const taxGold = numTaxablePopulationUnits * Miscellaneous.getTaxRate() * taxRaceMultiplier;

    // From minerals
    const mineralsRaceModifier = Population.getPrimaryRace() == Races.RACES.dwarf ? 2
        : Population.getSecondaryRaces().includes(Races.RACES.dwarf) ? 1.25
        : 1;
    const mineralsBuildingModified = Buildings.hasBuilding(Buildings.BUILDINGS.MINERS_GUILD) ? 1.5 : 1;
    const mineralValue = [
        Terrain.TERRAIN_SPECIALS.SILVER_ORE,
        Terrain.TERRAIN_SPECIALS.GOLD_ORE,
        Terrain.TERRAIN_SPECIALS.GEMS]
        .map(terrainType => {
            const count = Terrain.getTerrainSpecialTypeCount(terrainType);
            return count * Terrain.TERRAIN_SPECIALS_DATA[terrainType].goldValue;
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue);
    const mineralGold = mineralValue * mineralsBuildingModified * mineralsRaceModifier;

    return Math.floor(taxGold) + Math.floor(mineralGold);
}

/**
 * Calculate the bonus to gold
 * Calculations are done in percentage amount, then divided by 100 at the end
 */
function calculateGoldBonus() {
    // TODO: account for terrain, race, connected cities (count of cities other than the non-primary), etc
    const tradeBonus = 50;

    const buildingBonus = 0
        + (Buildings.hasBuilding(Buildings.BUILDINGS.MARKETPLACE) ? 50 : 0)
        + (Buildings.hasBuilding(Buildings.BUILDINGS.BANK) ? 50 : 0)
        + (Buildings.hasBuilding(Buildings.BUILDINGS.MERCHANTS_GUILD) ? 100 : 0);

    return (tradeBonus + buildingBonus) / 100.0;
}

/**
 * Trade Goods is a production project which produces gold instead of a building.
 */
function calculteTradeGoodGoldBonus() {
    // TODO: this
    return 0;
}

/**
 * In MOM, this doesn't include units, just buildings... not sure if we want to change that
 */
function calculateGoldUpkeep() {
    //return 65;
    const allBuildings = Buildings.getAllBuildings();

    const buildingUpkeep = Buildings.getAllBuildings()
        .filter(building => Buildings.hasBuilding(building))
        .map(building => Buildings.BUILDINGS_DATA[building].upkeepGold)
        .reduce((accumulator, currentValue) => accumulator + currentValue);

    return buildingUpkeep;
}

/**
 * EXPORT
 */
export {
    getNumRequiredFood,
    calculateGoldProduced,
    calculateGoldUpkeep
    };

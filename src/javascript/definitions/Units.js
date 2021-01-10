
import Unit from "../classes/Unit.js"
import Resources from "./Resources.js"

const SWORDSMAN = new Unit({
    displayName: "Swordsman",
    cost: [{type: Resources.PRODUCTION, amount: 25}],
    upkeep: [{type: Resources.GOLD, amount: 1}],
    description: "A basic sword wielder. Better than nothing, but only a little",
    dependencies: []
});

const Units = {
    SWORDSMAN: SWORDSMAN,
}

const keys = Object.keys(Units);
Units.getValues = function() {
    return keys.map(item => Units[item]);
};

export default Units;

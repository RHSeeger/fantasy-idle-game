
import SpecialProject from "../classes/SpecialProject.js"
import Resources from "./Resources.js"

const HOUSING = new SpecialProject({
    displayName: "Housing",
    description: "Production is redirected to building housing for new citizens. Continues until changed"
});

const TRADE_GOODS = new SpecialProject({
    displayName: "Trade Goods",
    description: "Production is redirected to building trade goods which are converted to gold. Continues until changed"
});

const SpecialProjects = {
    HOUSING: HOUSING,
    TRADE_GOODS: TRADE_GOODS
};

const keys = Object.keys(SpecialProjects);
SpecialProjects.getValues = function() {
    return keys.map(item => SpecialProjects[item]);
}


export default SpecialProjects;

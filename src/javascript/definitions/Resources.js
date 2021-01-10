
import Resource from "../classes/Resource.js"

const GOLD = new Resource('Gold');
const MANA = new Resource('Mana');
const PRODUCTION = new Resource('Production');

const Resources = {
    GOLD: GOLD,
    MANA: MANA,
    PRODUCTION: PRODUCTION
}

const keys = Object.keys(Resources);
Resources.getValues = function() {
    return keys.map(item => Resources[item]);
};

export default Resources;


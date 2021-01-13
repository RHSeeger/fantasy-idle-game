
import Terrain from "../../classes/terrain/Terrain.js"

const GRASSLAND = new Terrain({ displayName:'Grasslan' });
const FOREST = new Terrain({ displayName:'Forest' });
const DESERT = new Terrain({ displayName:'Desert' });
const SWAMP = new Terrain({ displayName:'Swamp' });
const RIVER = new Terrain({ displayName:'River' });
const RIVER_MOUTH = new Terrain({ displayName:'River Mouth' });
const HILLS = new Terrain({ displayName:'Hills' });
const MOUNTAIN = new Terrain({ displayName:'Mountain' });
const VOLCANO = new Terrain({ displayName:'Volcano' });
const TUNDRA = new Terrain({ displayName:'Tundra' });
const SHORE = new Terrain({ displayName:'Shore' });
const OCEAN = new Terrain({ displayName:'Ocean' });


const Terrains = {
    GRASSLAND: GRASSLAND,
    FOREST: FOREST,
    DESERT: DESERT,
    SWAMP: SWAMP,
    RIVER: RIVER,
    RIVER_MOUTH: RIVER_MOUTH,
    HILLS: HILLS,
    MOUNTAIN: MOUNTAIN,
    VOLCANO: VOLCANO,
    TUNDRA: TUNDRA,
    SHORE: SHORE,
    OCEAN: OCEAN
}

const keys = Object.keys(Terrains);
Terrains.getValues = function() {
    return keys.map(item => Terrains[item]);
};

export default Terrains;


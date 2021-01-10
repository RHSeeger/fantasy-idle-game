
import Race from "../classes/Race.js"

const HUMAN = new Race({
    displayName: "Human",
    description: ""
});
const HALFLING = new Race({
    displayName: "Halfling",
    description: ""
});
const LIZARD_MAN = new Race({
    displayName: "Lizard Man",
    description: ""
});
const DWARF = new Race({
    displayName: "Dwarf",
    description: ""
});


const Races = {
    HUMAN: HUMAN,
    HALFLING: HALFLING,
    LIZARD_MAN: LIZARD_MAN,
    DWARF: DWARF
}

const keys = Object.keys(Races);
Races.getValues = function() {
    return keys.map(item => Races[item]);
};

export default Races;
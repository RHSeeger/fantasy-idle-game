import Node from "../../classes/terrain/Node.js"

const LIFE_NODE = new Node({
    displayName: "Life Node",
    description: ""
});
const CHAOS_NODE = new Node({
    displayName: "Chaos Node",
    description: ""
});


const Nodes = {
    LIFE_NODE: LIFE_NODE,
    CHOAS_NODE: CHAOS_NODE
};

const keys = Object.keys(Nodes);
Nodes.getValues = function() {
    return keys.map(item => Nodes[item]);
};
Nodes.getKeys = function() {
    return keys;
};

export default Nodes;
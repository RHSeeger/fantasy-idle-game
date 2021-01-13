
import Buildings from "../definitions/Buildings.js"
import Units from "../definitions/Units.js"
import SpecialProjects from "../definitions/SpecialProjects.js"

const Projects = {
    ...Buildings,
    ...SpecialProjects,
    ...Units
}

// TODO: This (keys/values) is probably broken atm because the imports have functions
const keys = Object.keys(Projects);
Projects.getValues = function() {
    return keys.map(item => Projects[item]);
};

export default Projects;

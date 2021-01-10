
import Buildings from "../definitions/Buildings.js"
import Units from "../definitions/Units.js"
import SpecialProjects from "../definitions/SpecialProjects.js"

const Projects = {
    ...Buildings,
    ...SpecialProjects,
    ...Units
}

const keys = Object.keys(Projects);
Projects.getValues = function() {
    return keys.map(item => Projects[item]);
};

export default Projects;

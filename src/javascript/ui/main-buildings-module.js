/**
 * Updates the completed buildings list in the Main tab
 */

import Building from '../classes/Building.js';
import Buildings from '../definitions/Buildings.js';
import * as State from '../state/state-utils.js';

function update() {
    const userState = State.getPlayerState();

    const $content = $('.main .buildings-module .content');

    const alreadyInModule = $content.find(".project")
        .map(function() { return $(this).data('project')})
//        .map((index, elem) => elem.data('project'))
        .get();
    const completedBuildings = userState.construction.completed
        .filter(project => project instanceof Building);

    userState.construction.completed
        .filter(project => project instanceof Building)
        .forEach(function(project) {
            if (!(alreadyInModule.includes(project))) {
                console.log("Adding project to buildings display", project);
                // It's not already in the list, so add it
                const projectDiv = $("<div />", {
                    'class': 'project',
                    text: project.displayName
                }).data('project', project);
                $content.append(projectDiv);
                alreadyInModule.push(project);
            }
        });
}


export { update }

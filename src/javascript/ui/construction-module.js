/**
 * Code for the construction tab/module
 */

//import * as Construction from '../construction.js';
//import * as Buildings from '../buildings.js';
//import * as Units from "../units.js";
//import * as SpecialProjects from '../special-projects.js';
//import * as Resources from "../resources.js";
//
//import { BUILDINGS } from '../buildings.js';
//import { SPECIAL_PROJECTS } from '../special-projects.js';
//import { RESOURCES } from '../resources.js';

import Buildings from '../definitions/Buildings.js';
import SpecialProjects from '../definitions/SpecialProjects.js';
import Units from '../definitions/Units.js';
import Resources from '../definitions/Resources.js';

function initialize() {
    initializeOptions();
    initializeActions();
}

// TODO: I feel like the various widgets should be grabbing the game state from the environment, not needing it
//       passed in. So that various buttons that cause data changes cause the change to the most recent state

/**
 * Update the module
 * - Update the various project "buttons" to show/hide them based on availability
 * - Update the queue to show the projects currently in it
 */
function update(userState) {
    const $constructionContent = $(".application .tab-contents .tab-content-construction");

    updateProjectButtons(userState, $constructionContent);
    updateQueueWidget(userState, $constructionContent);
}

function updateProjectButtons(userState, $constructionContent) {
    const $projectsList = $constructionContent.find(".construction-option");

    // Update visibility of project buttons
    $projectsList.each((index, option) => {
        const $option = $(option);
        const value = $option.data("value");

        if (userState.construction.isCompleted(value)) {
            // It's already completed
            $option.css("display", "none");
        } else if (value.dependencies.some(dep => !userState.construction.isCompleted(dep))) {
            // We don't have it's dependencies
            $option.css("display", "none");
        } else {
            $option.css("display", "block");
        }
    });
}

// TODO: When adding a project item, add an X to remove it
// TODO: Add the ability to drag items around the queue
function updateQueueWidget(userState, $constructionContent) {
    const $queueWidget = $constructionContent.find(".queue");
    const $widgetProjects = $queueWidget.find(".project");
    const queuedProjects = userState.construction.queue;

    var $currentWidgetProjectsSublist = $widgetProjects;

    // Iterate over each project in the queue
    //console.log("Current widget projects",
    //    $widgetProjects.map(function(i,p) { return $(p).data('project').displayName; })
    //);
    queuedProjects.forEach(function(project) {
        //console.log("Looking to add project", project.displayName);

        if ($currentWidgetProjectsSublist.length == 0) {
            // If there's nothing left in the current sublist, then just add the project
            //console.log("Nothing in queue window, adding", project);
            $queueWidget.append(createQueueProjectElement(project));

            //const $projectDiv = $("<div />", {
            //    text: project.displayName,
            //    'class': 'project'
            //}).data("project", project);
            //$queueWidget.append($projectDiv);
        } else {
            const $nextWidgetProject = $currentWidgetProjectsSublist.eq(0);
            //console.log("Next project in widget", $nextWidgetProject);

            if ($nextWidgetProject.data('project') == project) {
                // If it's the currently looked at project in the widget, we're done, continue the projects loop
                //console.log("Next project is current project, no action necessary", project);
            } else {
                // Otherwise, replace the currently being looked at element with a new project element
                //console.log("Replacing next project with current", $nextWidgetProject.data("project"));
                $nextWidgetProject.replaceWith(createQueueProjectElement(project));


                //const $projectDiv = $("<div />", {
                //    text: project.displayName
                //}).data("project", project);
                //const $close = $("<span />", {
                //    'class': 'x-close',
                //    text: 'X'
                //});
                //$projectDiv.append($close);
                //$queueWidget.append($projectDiv);
                //$nextWidgetProject.replaceWith($projectDiv);
            }
        }

        if ($currentWidgetProjectsSublist.length > 0) {
            $currentWidgetProjectsSublist = $currentWidgetProjectsSublist.slice(1);
        }
    });

    while ($currentWidgetProjectsSublist.length > 0) {
        const $nextWidgetProject = $currentWidgetProjectsSublist.eq(0);
        $nextWidgetProject.remove();
        $currentWidgetProjectsSublist = $currentWidgetProjectsSublist.slice(1);
    }
}

function createQueueProjectElement(project) {
    const $projectDiv = $("<div />", {
        'class': 'project'
    }).data("project", project);
    const $close = $("<span />", {
        'class': 'x-close',
        text: 'x'
    });
    $projectDiv.append($close);
    const $label = $("<span />", {
        'class': 'label',
        text: project.displayName
    });
    $projectDiv.append($label);

    $close.click(function() {
        // TODO: This... there should be a quick, clean way to get the player state to update
        const userState = document.gameState.player;
        const queuedProjects = userState.construction.queue;
        const index = queuedProjects.indexOf(project);
        if (index > -1) {
            queuedProjects.splice(index, 1);
        }
        update(userState);
    });

    return $projectDiv;
}

/**
 * Initializes the list of available projects (buildings, units, and special)
 */
function initializeOptions() {
    const $constructionContent = $(".application .tab-contents .tab-content-construction")

    // The left side projects, which includes special projects and buildings
    const $projectsList = $constructionContent.find(".buildings");
    $projectsList.empty();

    SpecialProjects.getValues().forEach(project => {
        var projectDiv = $("<div/>", {
            'class': 'construction-option construction-option-building',
            'data-type': 'special-project',
            'text': project.displayName
        });
        projectDiv.data("value", project);
        $projectsList.append(projectDiv);
    });

    Buildings.getValues().forEach(project => {
        var projectDiv = $("<div/>", {
            'class': 'construction-option construction-option-building',
            'data-type': 'building',
            'text': project.displayName
        });
        projectDiv.data("value", project);
        $projectsList.append(projectDiv);
    });

    // The right side projects, which includes units
    const $unitsList = $constructionContent.find(".units");
    $unitsList.empty();

    Units.getValues().forEach(project => {
        var projectDiv = $("<div/>", {
            'class': 'construction-option construction-option-unit',
            'data-type': 'unit',
            'text': project.displayName
        });
        projectDiv.data("value", project);
        $unitsList.append(projectDiv);
    });
}

function initializeActions() {
    $(".application .tab-contents .tab-content-construction .construction-option").each(function(index, option) {
        const $option = $(option);
        const typeName = $option.attr('data-type');
        //const value = $option.attr('data-value')
        const value = $option.data("value");

        $option.click(function() {
            $(".application .tab-contents .tab-content-construction .construction-option").removeClass("active");
            $(this).addClass("active");
            setSelectedProject(typeName, value);
        });
    })
}


/**
 * Sets the currently selected project.
 * Note that this is just the project that displays in the construction module, the one that will be added to the
 * queue if that button is pressed. This has no effect on the queue / what the user is currently building
 * @type One of the modules Buildings, SpecialProjects, Units
 */
function setSelectedProject(typeName, value) {

    const $main = $(".application .tab-contents .tab-content-construction .asset");

    // Name
    console.log("Display Name", value.displayName);
    $main.find(".summary .name").text(value.displayName);

    // Cost
    var cost = Resources.getValues()
        .map(resource => [resource, value.getCost(resource)])
        .filter(resourceData => resourceData[1] != null && resourceData[1] > 0)
        .map(resourceData => resourceData[1] + " " + resourceData[0].displayName);
    $main.find(".summary .cost .value").text(cost.length === 0 ? "<special>" : cost.join(" and "));

    // Maintenance
    var upkeep = Resources.getValues()
        .map(resource => [resource, value.getUpkeep(resource)])
        .filter(resourceData => resourceData[1] != null && resourceData[1] > 0)
        .map(resourceData => resourceData[1] + " " + resourceData[0].displayName);
    $main.find(".widget-maintenance .value").text(upkeep.length === 0 ? "<special>" : upkeep.join(" and "));

    // Allows
    // this is actually more complicated than this, because one type of project could allow another
    //const allows = dataSource.getAllows(value);
    //$main.find(".widget-allows .value").text(allows.join(" and "));

    // Description
    const description = typeof value.description !== 'undefined' ? value.description : nul;
    $main.find(".description").text(description === null ? "" : description);
}

/** EXPORTS **/

export { initialize, update };

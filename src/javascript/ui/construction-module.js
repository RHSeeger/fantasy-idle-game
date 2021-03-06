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
import * as State from '../state/state-utils.js';

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
function update() {
    const $constructionContent = $(".application .tab-contents .tab-content-construction");

    updateProjectButtons($constructionContent);
    updateQueueWidget($constructionContent);
}

function updateProjectButtons($constructionContent) {
    const userState = State.getPlayerState();

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
function updateQueueWidget($constructionContent) {
    const userState = State.getPlayerState();

    const $queueWidget = $constructionContent.find(".queue");
    const $widgetProjects = $queueWidget.find(".project");
    const queuedProjects = userState.construction.queue;

    // The list of projects in the queue widget
    var $currentWidgetProjectsSublist = $widgetProjects;

    // Update the queue display to include the correct projects
    queuedProjects.forEach(function(project) {
        if ($currentWidgetProjectsSublist.length == 0) {
            // If there's nothing left in the current sublist, then just add the project
            $queueWidget.append(createQueueProjectElement(project));
        } else {
            const $nextWidgetProject = $currentWidgetProjectsSublist.eq(0);

            if ($nextWidgetProject.data('project') == project) {
                // If it's the currently looked at project in the widget, we're done, continue the projects loop
            } else {
                // Otherwise, replace the currently being looked at element with a new project element
                $nextWidgetProject.replaceWith(createQueueProjectElement(project));
            }
        }

        if ($currentWidgetProjectsSublist.length > 0) {
            $currentWidgetProjectsSublist = $currentWidgetProjectsSublist.slice(1);
        }
    });

    // Remove any projects left in the queue windows, since they don't exist in the queue data
    while ($currentWidgetProjectsSublist.length > 0) {
        const $nextWidgetProject = $currentWidgetProjectsSublist.eq(0);
        $nextWidgetProject.remove();
        $currentWidgetProjectsSublist = $currentWidgetProjectsSublist.slice(1);
    }

    // Update the progress bar of the first project
    const $currentProjectWidget = $queueWidget.find(".project").first();
    //console.log("Current project div", $currentProjectWidget);
    const project = $currentProjectWidget.data('project');
    //console.log("Current project", project);
    if (project !== SpecialProjects.HOUSING && project !== SpecialProjects.TRADE_GOODS) {
        const totalCost = project.getCost(Resources.PRODUCTION);
        const progress = 100 * userState.construction.progress / totalCost;
        //console.log("Setting progress bar to %", progress);
        $currentProjectWidget.find('.progress-bar .filled').css('width', progress + "%");
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

    const $progressBar = $("<div />", {
        'class': 'progress-bar'
    })
    const $progressBarProgress = $("<div />", {
        'class': 'filled',
        width: 0
    })
    $progressBar.append($progressBarProgress);
    $projectDiv.append($progressBar);

    $close.click(function() {
        State.getPlayerState().construction.removeFromQueue(project);
        update();
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
    const $main = $(".application .tab-contents .tab-content-construction");

    $main.find(".construction-option").each(function(index, option) {
        const $option = $(option);
        const typeName = $option.attr('data-type');
        //const value = $option.attr('data-value')
        const project = $option.data("value");

        $option.click(function() {
            $(".application .tab-contents .tab-content-construction .construction-option").removeClass("active");
            $(this).addClass("active");
            setSelectedProject(typeName, project);
        });
    });


    $main.find('.button-queue-first').click(function() {
        const project = $(this).data('project');
        const playerState = State.getPlayerState();
        playerState.construction.addToQueueFirst(project);
        update();
    });
    $main.find('.button-queue-last').click(function() {
        const project = $(this).data('project');
        const playerState = State.getPlayerState();
        playerState.construction.addToQueueLast(project);
        update();
    });
}


/**
 * Sets the currently selected project.
 * Note that this is just the project that displays in the construction module, the one that will be added to the
 * queue if that button is pressed. This has no effect on the queue / what the user is currently building
 * @type One of the modules Buildings, SpecialProjects, Units
 */
function setSelectedProject(typeName, project) {

    const $main = $(".application .tab-contents .tab-content-construction .asset");

    // Name
    console.log("Display Name", project.displayName);
    $main.find(".summary .name").text(project.displayName);

    // Cost
    var cost = Resources.getValues()
        .map(resource => [resource, project.getCost(resource)])
        .filter(resourceData => resourceData[1] != null && resourceData[1] > 0)
        .map(resourceData => resourceData[1] + " " + resourceData[0].displayName);
    $main.find(".summary .cost .value").text(cost.length === 0 ? "<special>" : cost.join(" and "));

    // Maintenance
    var upkeep = Resources.getValues()
        .map(resource => [resource, project.getUpkeep(resource)])
        .filter(resourceData => resourceData[1] != null && resourceData[1] > 0)
        .map(resourceData => resourceData[1] + " " + resourceData[0].displayName);
    $main.find(".widget-maintenance .value").text(upkeep.length === 0 ? "<special>" : upkeep.join(" and "));

    // Allows
    const $wigetAllowsValue = $main.find('.widget-allows .value');
    $wigetAllowsValue.empty();

    const allowedElems = [];
    const userState = State.getPlayerState();
    Buildings.getValues().forEach(proj => {
        if (userState.construction.isCompleted(proj)) {
            // if we already have a building, then obviously building this one won't allow us to build that one
            return;
        }

        // TODO: Which ones are allowed vs allowedWithAdditions may change as projects are completed
        if (allowsProject(proj, project, userState)) {
            allowedElems.push($("<li />", {
                'class': 'allowed-project',
                text: proj.displayName
            }).data(proj));
            return;
        }

        if (proj.dependencies.includes(project)) {
            // At this point, if the project is a dependency of proj
            // Then we know that there are some other dependencies that the user does not have
            // (otherwise the previous block would have handled it
            allowedElems.push($("<li />", {
                'class': 'allowed-project incomplete',
                text: proj.displayName,
                'data-tooltip': 'This item requires other buildings to be able to complete'
            }).data(proj));
            return;
        }
    });

    if (allowedElems.length === 0) {
        $wigetAllowsValue.text("None");
    } else {
        allowedElems.forEach(elem => $wigetAllowsValue.append(elem));
    }

    // Description
    const description = typeof project.description !== 'undefined' ? project.description : nul;
    $main.find(".description").text(description === null ? "" : description);


    // Set the actions for the QueueFirst and QueueList buttons
    $main.find('.button-queue-first').data('project', project);
    $main.find('.button-queue-last').data('project', project);
}

function allowsProject(project, isAllowedByProject, userState) {
    if (!project.dependencies.includes(isAllowedByProject)) {
        return false;
    }

    // If there's any projects (that are not the one we're checking as a dependency)
    // that the user doesn't have... then return false
    return ! project.dependencies
        .filter(depProj => depProj !== isAllowedByProject)
        .some(depProj => ! userState.construction.isCompleted(depProj));
}


/** EXPORTS **/

export { initialize, update };

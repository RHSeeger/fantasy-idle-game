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

jQuery.fn.extend({
    getPath: function() {
        var pathes = [];

        this.each(function(index, element) {
            var path, $node = jQuery(element);

            while ($node.length) {
                var realNode = $node.get(0), name = realNode.localName;
                if (!name) { break; }

                name = name.toLowerCase();
                var parent = $node.parent();
                var sameTagSiblings = parent.children(name);

                if (sameTagSiblings.length > 1)
                {
                    var allSiblings = parent.children();
                    var index = allSiblings.index(realNode) + 1;
                    if (index > 0) {
                        name += ':nth-child(' + index + ')';
                    }
                }

                path = name + (path ? ' > ' + path : '');
                $node = parent;
            }

            pathes.push(path);
        });

        return pathes.join(',');
    }
});

/**
 * Update the module
 * - Update the various project "buttons" to show/hide them based on availability
 * - Update the queue to show the projects currently in it
 */
function update(userState) {
    const $constructionContent = $(".application .tab-contents .tab-content-construction")
    const $projectsList = $constructionContent.find(".construction-option");

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

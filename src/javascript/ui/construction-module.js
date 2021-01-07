/**
 * Code for the construction tab/module
 */

import * as Buildings from '../buildings.js';
import * as Construction from '../construction.js';
import * as Units from "../units.js";
import * as Resources from "../resources.js";

import { BUILDINGS } from '../buildings.js';
import { SPECIAL_PROJECTS } from '../construction.js';
import { RESOURCES } from '../resources.js';

function initialize() {
    initializeProjectsList();
    initializeUnitsList();

    initializeActions();
}

function update() {
}

/**
 * Updates the list of available projects (buildings, units, and special)
 */
function initializeProjectsList() {
    const $constructionContent = $(".application .tab-contents .tab-content-construction")
    const $projectsList = $constructionContent.find(".buildings");

    $projectsList.empty();

    //console.log("Special Projects:", Construction.getAllSpecialProjects());
    //Construction.getAllSpecialProjects().forEach(elem => { console.log(elem); } );

    Construction.getAllSpecialProjects().forEach(project => {
        //console.log("Adding special project", project, Construction.getSpecialProjectDisplayName(project));
        var project = $("<div/>", {
            'class': 'construction-option construction-option-building',
            'data-type': 'special-project',
            'data-value': project,
            'text': Construction.getDisplayName(project)
        });
        $projectsList.append(project);
    });

    Buildings.getAllBuildings().forEach(project => {
        //console.log("Adding building", project, Buildings.getBuildingDisplayName(project));
        var project = $("<div/>", {
            'class': 'construction-option construction-option-building',
            'data-type': 'building',
            'data-value': project,
            'text': Buildings.getDisplayName(project)
        });
        $projectsList.append(project);
    });
}

function initializeUnitsList() {

}

function initializeActions() {
    $(".application .tab-contents .tab-content-construction .construction-option").each(function(index, option) {
        const $option = $(option);
        const type = $option.attr('data-type');
        const value = $option.attr('data-value')

        $option.click(function() {
            $(".application .tab-contents .tab-content-construction .construction-option").removeClass("active");
            $(this).addClass("active");
            displaySelected(type, value);
        });
    })
}

function displaySelected(type, value) {
    console.log("Displaying selected", type, value);

    const dataSource = type === 'building' ? Buildings
        : type === "special-project" ? Construction
        : type === "unit" ? Units
        : null;

    const $main = $(".application .tab-contents .tab-content-construction .asset");

    // Name
    const displayName = dataSource.getDisplayName(value);
    console.log("Display Name", displayName);
    $main.find(".summary .name").text(displayName);

    // Cost
    var cost = [RESOURCES.GOLD, RESOURCES.MANA, RESOURCES.PRODUCTION]
        .map(resource => [resource, dataSource.getCost(value, resource)])
        .filter(resourceData => resourceData[1] > 0)
        .map(resourceData => resourceData[1] + " " + Resources.getDisplayName(resourceData[0]));
    $main.find(".summary .cost .value").text(cost.length === 0 ? "<special>" : cost.join(" and "));

    // Maintenance
    var upkeep = [RESOURCES.GOLD, RESOURCES.MANA, RESOURCES.PRODUCTION]
        .map(resource => [resource, dataSource.getUpkeep(value, resource)])
        .filter(resourceData => resourceData[1] > 0)
        .map(resourceData => resourceData[1] + " " + Resources.getDisplayName(resourceData[0]));
    $main.find(".widget-maintenance .value").text(upkeep.length === 0 ? "<special>" : upkeep.join(" and "));

    // Allows
    // this is actually more complicated than this, because one type of project could allow another
    //const allows = dataSource.getAllows(value);
    //$main.find(".widget-allows .value").text(allows.join(" and "));

    // Description
    const description = dataSource.getDescription(value);
    $main.find(".description").text(description === null ? "" : description);
}


/** EXPORTS **/

export { initialize, update };

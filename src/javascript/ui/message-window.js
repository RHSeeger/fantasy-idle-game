/*
 * Used to display messages to the player in the message window
 */

// TODO: this
function info(message) {
    console.log("MESSAGE: " + message);
}

function building(message) {
    console.log("MESSAGE (building): " + message);
}

function combat(message) {
    console.log("MESSAGE (combat): " + message);
}

export {
    info,
    building,
    combat
    }
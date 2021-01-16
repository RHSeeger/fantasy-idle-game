
function getGameState() {
    return document.game;
}

function setGameState(gameState) {
    // TODO: Add some checks to make sure the game state doesn't get erased if something invalid is passed in
    document.game = gameState;
}

function getPlayerState() {
    return getGameState().player;
}


export {
    getGameState,
    setGameState,
    getPlayerState
    };

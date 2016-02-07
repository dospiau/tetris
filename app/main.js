import Game from './Game.js';

//this is our game context
window.Tetris = {
    canvas : document.getElementById("game-canvas"),
    entities : new Map(),
    context : document.getElementById("game-canvas").getContext("2d"),
    document : document,
    lost : false,
    //@TODO this colud go to some settings
    speed : 1,
    isStarted : true,
    withPreview : true
};

var g = new Game(Tetris);
g.start();





'use strict';

const ball = require('./lib/ball');
const paddle1 = require('./lib/paddle')(document.getElementById('paddle1'));
const paddle2 = require('./lib/paddle')(document.getElementById('paddle2'));

ball.setPaddles([paddle1, paddle2]);

document.addEventListener('click', function() {
    paused = !paused;
});

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case "ArrowDown":
            paddle1.setState('down');
            paddle2.setState('down');
            return;
        case "ArrowUp":
            paddle1.setState('up');
            paddle2.setState('up');
            return;
    }
});

document.addEventListener('keyup', function(event) {
    paddle1.setState();
    paddle2.setState();
});

let gameOver = false;
let paused = false;
let frame = 0;

function render() {
    paddle1.update();
    paddle2.update();
    ball.update();
}

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

(function animloop() {
    requestAnimFrame(animloop);
    if (paused || gameOver) {
        return;
    }
    render();
})();

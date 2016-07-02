'use strict';

const createPoint = require('./point');
const world = require('./world');

const el = document.getElementById('ball');
const size = el.offsetWidth;
let coor = createPoint(0, 0);
let dir = createPoint(-1, 1);
let vel = 2;
let paddles

exports.setPaddles = (list) => {
    paddles = list;
};

exports.update = () => {
    coor.x += vel * dir.x;
    coor.y += vel * dir.y;
    validateDir();
    updateView();
};

function validateDir() {
    if (coor.x + size >= world.width || coor.x <= 0 || checkPaddlesColl()) {
        dir.x = -dir.x;
    }
    if (coor.y + size >= world.height || coor.y <= 0) {
        dir.y = -dir.y;
    }
}

function checkPaddlesColl() {
    return paddles.filter(paddleHit).length > 0;
}

function paddleHit(paddle) {
    return paddle.intersectWithBall(coor, size, dir.x);
}

function updateView() {
    el.style.left = coor.x + 'px';
    el.style.top = coor.y + 'px';
}

function reset() {
    coor = createPoint(
        world.halfWidth - (size / 2),
        world.halfHeight - (size / 2)
    );
    updateView();
}

reset();

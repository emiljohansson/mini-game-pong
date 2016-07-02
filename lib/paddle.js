'use strict';

const createPoint = require('./point');
const world = require('./world');

function createPaddle(el) {
    const instance = {};

    const width = el.offsetWidth;
    const height = el.offsetHeight;
    const collWidth = (width / 3);
    let coor = createPoint(0, 0);
    let dir = createPoint(0, 0);
    let vel = 4;

    reset();

    instance.intersectWithBall = (function() {
        if (coor.x < world.halfWidth) {
            return leftSideValidator;
        }
        return rightSideValidator;
    }());

    instance.update = () => {
        const newY = coor.y + (vel * dir.y);
        if (newY + height >= world.height || newY <= 0) {
            return;
        }
        coor.y = newY;
        updateView();
    };

    instance.setState = (newState) => {
        if (newState === 'up') {
            dir.y = -1;
            return;
        }
        if (newState === 'down') {
            dir.y = 1;
            return;
        }
        dir.y = 0;
    };

    function leftSideValidator(ballCoor, ballRadius, dirX) {
        if (dirX > -1) {
            return;
        }
        if (!(ballCoor.x < coor.x + width && ballCoor.x < coor.x + width - collWidth)) {
            return;
        }
        if (hitY(ballCoor.y, ballRadius)) {
            return;
        }
        return true;
    }

    function rightSideValidator(ballCoor, ballRadius, dirX) {
        if (dirX < 1) {
            return;
        }
        if (!(ballCoor.x + ballRadius > coor.x && ballCoor.x + ballRadius < coor.x + collWidth)) {
            return;
        }
        if (hitY(ballCoor.y, ballRadius)) {
            return;
        }
        return true;
    }

    function hitY(ballCoorY, ballRadius) {
        return ballCoorY + ballRadius < coor.y || ballCoorY > coor.y + height;
    }

    function updateView() {
        el.style.left = coor.x + 'px';
        el.style.top = coor.y + 'px';
    }

    function reset() {
        coor = createPoint(
            el.offsetLeft,
            world.halfHeight - (height / 2)
        );
        updateView();
    }

    return instance;
}

module.exports = createPaddle;

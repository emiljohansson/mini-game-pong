'use strict';

const el = document.getElementById('game');

exports.width = el.offsetWidth;
exports.height = el.offsetHeight;

exports.halfWidth = exports.width / 2;
exports.halfHeight = exports.height / 2;

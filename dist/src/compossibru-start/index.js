'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.start = undefined;

var _child_process = require('child_process');

var start = exports.start = function start(port) {
    var child = (0, _child_process.spawn)('npx next -p ' + port, {
        shell: true
    });

    child.on('error', function (err) {
        throw err;
    });

    child.stdout.on('data', function (data) {
        process.stdout.write(data);
    });

    child.stderr.on('data', function (data) {
        process.stdout.write(data);
    });

    child.on('exit', function () {
        process.stdout.write('I\'m done!');
    });
};
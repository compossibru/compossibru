'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.build = undefined;

var _child_process = require('child_process');

var build = exports.build = function build() {
    var child = (0, _child_process.spawn)('npx next build && npx next export', {
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
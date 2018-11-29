'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.watch = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var watch = exports.watch = function watch(filepath, fn) {
    _fs2.default.watch('layouts/', { recursive: true }, function () {
        fn();
    });

    _fs2.default.watchFile(filepath, function () {
        fn();
    });
};
#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _cosmiconfig = require('cosmiconfig');

var _cosmiconfig2 = _interopRequireDefault(_cosmiconfig);

var _package = require('../package.json');

var _compossibru = require('../src/compossibru');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line

var explorer = (0, _cosmiconfig2.default)('compossibru', { cache: false });
var getConfiguration = function getConfiguration() {
    var _ref = explorer.searchSync() || {},
        configuration = _ref.config;

    if (!configuration) {
        throw new Error('Cannot find configuration for compossibru');
    }
    return configuration;
};
var getFilepathToWatch = function getFilepathToWatch() {
    var _ref2 = explorer.searchSync() || {},
        filepath = _ref2.filepath;

    if (!filepath) {
        throw new Error('Cannot find configuration for compossibru');
    }
    return filepath;
};

var compossibru = function compossibru() {
    console.log(_package.name + ' CLI (' + _package.version + ')'); // eslint-disable-line
};

_commander2.default.version(_package.version).description([_package.name + ' CLI (' + _package.version + ')', '', 'Created with <3 by', _package.authors.map(function (author) {
    return author.name;
}).join(', ')].join('\n'));

_commander2.default.command('start').description('Start application with dev server').option('-p, --port [port]', 'Given port to run dev server', '3000').option('-w, --watch [watch]', 'Watch files to re-generate pages', 'true').action(function (options) {
    compossibru();
    (0, _compossibru.generatePages)(getConfiguration());
    (0, _compossibru.start)(options.port);
    if (options.watch === 'true') {
        (0, _compossibru.watch)(getFilepathToWatch(), function () {
            (0, _compossibru.generatePages)(getConfiguration());
        });
    }
});

_commander2.default.command('build').description('Build the application').action(function () {
    compossibru();
    (0, _compossibru.generatePages)(getConfiguration());
    (0, _compossibru.build)();
});

_commander2.default.parse(process.argv);

if (_commander2.default.args.length === 0) {
    _commander2.default.help();
}
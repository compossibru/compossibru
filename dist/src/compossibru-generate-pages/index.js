'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generatePages = exports.preparePages = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _uuid = require('uuid');

var _camelcase = require('camelcase');

var _camelcase2 = _interopRequireDefault(_camelcase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var preparePages = exports.preparePages = function preparePages(configuration, widgetIdGenerator, layoutPathFinder) {
    var globalStyles = configuration.Styles || [];
    return Object.keys(configuration.Routes).map(function (routeKey) {
        var routeConfig = configuration.Routes[routeKey];
        var routeFileName = void 0;
        if (routeConfig.Route === '/') {
            routeFileName = 'index';
        } else {
            routeFileName = routeConfig.Route.split('/')[1]; // eslint-disable-line
        }

        var widgetExecutions = [];
        var layoutVariables = {};
        var widgetImports = {};
        Object.keys(routeConfig.Containers).forEach(function (containerName) {
            var widgets = routeConfig.Containers[containerName] || [];
            var divs = [];
            widgets.forEach(function (rawWidget) {
                var widget = rawWidget;
                var widgetContext = void 0;
                if ((typeof rawWidget === 'undefined' ? 'undefined' : _typeof(rawWidget)) === 'object') {
                    var keys = Object.keys(rawWidget);
                    if (keys.length !== 1) {
                        throw new Error('Widget is misconfigured');
                    }
                    widget = keys[0];
                    widgetContext = rawWidget[widget];
                }
                var widgetId = widgetIdGenerator();
                var widgetName = (0, _camelcase2.default)(widget).replace(/[^\w\s]/gi, '_');
                var widgetPath = widget;
                widgetExecutions.push({
                    id: widgetId,
                    name: widgetName,
                    context: JSON.stringify(widgetContext || {})
                });
                divs.push('<div id="' + widgetId + '"></div>');
                widgetImports[widget] = {
                    name: widgetName,
                    path: widgetPath
                };
            });
            layoutVariables[containerName] = divs.join('');
        });

        return {
            layoutPath: layoutPathFinder() + '/' + routeConfig.Layout,
            layoutVariables: layoutVariables,
            styles: globalStyles,
            widgetImports: Object.values(widgetImports),
            widgetExecutions: widgetExecutions,
            routeFileName: routeFileName
        };
    });
};

var generatePages = exports.generatePages = function generatePages(configuration) {
    if (_fsExtra2.default.existsSync('pages')) {
        _fsExtra2.default.removeSync('pages');
    }
    _fsExtra2.default.mkdirSync('pages');

    var template = _fsExtra2.default.readFileSync(_path2.default.dirname(__filename) + '/templates/page.ejs').toString();
    var pages = preparePages(configuration, function () {
        return 'compossibru-' + (0, _uuid.v4)();
    }, process.cwd);
    pages.forEach(function (page) {
        _fsExtra2.default.writeFileSync('pages/' + page.routeFileName + '.js', _ejs2.default.render(template, page));
    });
};
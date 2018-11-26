const path = require('path');
const fs = require('fs-extra');
const cosmiconfig = require('cosmiconfig');
const ejs = require('ejs');
const uuid = require('uuid').v4;
const camelCase = require('camelcase');

const explorer = cosmiconfig('compossibru');
const generatePages = () => {
    const { config: configuration } = explorer.searchSync() || {};
    if (!configuration) {
        throw new Error('Cannot find configuration for compossibru');
    }

    if (fs.existsSync('pages')) {
        fs.removeSync('pages');
    }
    fs.mkdirSync('pages');

    const globalStyles = configuration.Styles || [];
    Object.keys(configuration.Routes).forEach((routeKey) => {
        const routeConfig = configuration.Routes[routeKey];
        let routeFileName;
        if (routeConfig.Route === '/') {
            routeFileName = 'index';
        } else {
            routeFileName = routeConfig.Route.split('/')[1]; // eslint-disable-line
        }

        const widgetExecutions = [];
        const layoutVariables = {};
        const widgetImports = {};
        Object.keys(routeConfig.Containers).forEach((containerName) => {
            const widgets = routeConfig.Containers[containerName] || [];
            const divs = [];
            widgets.forEach((widget) => {
                const widgetId = `compossibru-${uuid()}`;
                const widgetName = camelCase(widget);
                const widgetPath = widget;
                widgetExecutions.push({
                    id: widgetId,
                    name: widgetName
                });
                divs.push(`<div id="${widgetId}"></div>`);
                widgetImports[widget] = {
                    name: widgetName,
                    path: widgetPath
                };
            });
            layoutVariables[containerName] = divs.join('');
        });

        const template = fs.readFileSync(`${path.dirname(__filename)}/templates/page.ejs`).toString();
        const variables = {
            layoutPath: `${process.cwd()}/${routeConfig.Layout}`,
            layoutVariables,
            styles: globalStyles,
            widgetImports: Object.values(widgetImports),
            widgetExecutions
        };

        fs.writeFileSync(`pages/${routeFileName}.js`, ejs.render(template, variables));
    });
};

module.exports = generatePages;

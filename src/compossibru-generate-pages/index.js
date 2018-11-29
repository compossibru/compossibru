import path from 'path';
import fs from 'fs-extra';
import ejs from 'ejs';
import { v4 as uuid } from 'uuid';
import camelCase from 'camelcase';

export const preparePages = (configuration, widgetIdGenerator, layoutPathFinder) => {
    const globalStyles = configuration.Styles || [];
    return Object.keys(configuration.Routes).map((routeKey) => {
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
            widgets.forEach((rawWidget) => {
                let widget = rawWidget;
                let widgetContext;
                if (typeof rawWidget === 'object') {
                    const keys = Object.keys(rawWidget);
                    if (keys.length !== 1) {
                        throw new Error('Widget is misconfigured');
                    }
                    widget = keys[0];
                    widgetContext = rawWidget[widget];
                }
                const widgetId = widgetIdGenerator();
                const widgetName = camelCase(widget).replace(/[^\w\s]/gi, '_');
                const widgetPath = widget;
                widgetExecutions.push({
                    id: widgetId,
                    name: widgetName,
                    context: JSON.stringify(widgetContext || {})
                });
                divs.push(`<div id="${widgetId}"></div>`);
                widgetImports[widget] = {
                    name: widgetName,
                    path: widgetPath
                };
            });
            layoutVariables[containerName] = divs.join('');
        });

        return {
            layoutPath: `${layoutPathFinder()}/${routeConfig.Layout}`,
            layoutVariables,
            styles: globalStyles,
            widgetImports: Object.values(widgetImports),
            widgetExecutions,
            routeFileName
        };
    });
};

export const generatePages = (configuration) => {
    if (fs.existsSync('pages')) {
        fs.removeSync('pages');
    }
    fs.mkdirSync('pages');

    const template = fs.readFileSync(`${path.dirname(__filename)}/templates/page.ejs`).toString();
    const pages = preparePages(
        configuration,
        () => `compossibru-${uuid()}`,
        process.cwd
    );
    pages.forEach((page) => {
        fs.writeFileSync(`pages/${page.routeFileName}.js`, ejs.render(template, page));
    });
};

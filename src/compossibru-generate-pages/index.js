import fs from 'fs-extra';
import ejs from 'ejs';
import camelCase from 'camelcase';

import Container from './model/Container';
import Import from './model/Import';
import Route from './model/Route';
import Widget from './model/Widget';
import ConfigurationParser from './parser/v1/ConfigurationParser';

export const preparePages = (configuration, widgetIdGenerator, layoutPathFinder) => {
    const version = `${configuration.Version || '1'}`;

    let routes: Route[];
    if (version === '1') {
        const configurationParser = new ConfigurationParser(configuration);
        routes = configurationParser.getRoutes();
    } else {
        throw new Error(`Unsupported version: ${version}`);
    }

    return routes.map((route: Route) => {
        let routeFileName = 'index';
        if (route.path !== '/') {
            routeFileName = route.path.split('/')[1]; // eslint-disable-line
        }
        const widgetExecutions = [];
        const layoutVariables = {};
        const widgetImports = {};
        route.containers.forEach((container: Container) => {
            const divs = [];
            container.widgets.forEach((widget: Widget) => {
                const widgetId = widgetIdGenerator();
                const widgetName = camelCase(widget.name).replace(/[^\w\s]/gi, '_');
                const widgetPath = widget.name;
                widgetExecutions.push({
                    id: widgetId,
                    name: widgetName,
                    context: JSON.stringify(widget.context || {})
                });
                widgetImports[widget.name] = {
                    name: widgetName,
                    path: widgetPath
                };
                divs.push(`<div id="${widgetId}"></div>`);
            });
            layoutVariables[container.name] = divs.join('');
        });

        return {
            layoutPath: `${layoutPathFinder()}/${route.layout}`,
            layoutVariables,
            imports: route.imports
                .filter((routeImport: Import) => !!routeImport.value)
                .reduce((object: Object, routeImport: Import) => ({
                    ...object,
                    [routeImport.key]: routeImport.value
                }), {}),
            styles: route.imports
                .filter((routeImport: Import) => !routeImport.value)
                .map((routeImport: Import) => routeImport.key),
            widgetImports: Object.values(widgetImports),
            widgetExecutions,
            routeFileName
        };
    });
};

export const generatePages = (configuration, templatePath, pagesPath, widgetIdGenerator, layoutPathFinder) => {
    const template = fs.readFileSync(`${templatePath}/templates/page.ejs`).toString();
    const pages = preparePages(
        configuration,
        widgetIdGenerator,
        layoutPathFinder
    );
    pages.forEach((page) => {
        fs.writeFileSync(`${pagesPath}/${page.routeFileName}.js`, ejs.render(template, page));
    });
};

/* @flow */

import Container from '../../model/Container';
import Import from '../../model/Import';
import Route from '../../model/Route';
import Widget from '../../model/Widget';

export default class ConfigurationParser {
    configuration: Object;

    constructor(configuration: Object) {
        this.configuration = configuration;
        Object.freeze(this);
    }

    getRoutes(): Route[] {
        return Object.keys(this.configuration.Routes).map((routeKey) => {
            const route = this.configuration.Routes[routeKey];
            const routeStyles = [
                ...(this.configuration.Styles || []),
                ...(route.Styles || [])
            ];
            const routeImports = {
                ...(this.configuration.Imports || {}),
                ...(route.Imports || {})
            };
            const imports = [];
            routeStyles.forEach((style) => {
                imports.push(new Import(style));
            });
            Object.keys(routeImports).forEach((routeImportKey) => {
                imports.push(new Import(routeImportKey, routeImports[routeImportKey]));
            });
            return new Route(
                route.Route,
                route.Layout,
                imports,
                Object.keys(route.Containers).map((containerName) => {
                    const widgets = route.Containers[containerName];
                    return new Container(
                        containerName,
                        widgets.map((widget) => {
                            let widgetName = widget;
                            let widgetContext;
                            if (typeof widget === 'object') {
                                const widgetKeys = Object.keys(widget);
                                if (widgetKeys.length !== 1) {
                                    throw new Error('Widget is misconfigured');
                                }
                                widgetName = widgetKeys[0];
                                widgetContext = widget[widgetName];
                            }
                            return new Widget(widgetName, widgetContext);
                        })
                    );
                })
            )
        });
    }
}

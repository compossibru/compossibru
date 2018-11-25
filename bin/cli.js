#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const YAML = require('yamljs');
const ejs = require('ejs');
const uuid = require('uuid').v4;
const camelCase = require('camelcase');
const { spawn } = require('child_process');

const generatePages = () => {
    const configuration = YAML.load('compossibru.config.yml');
    if (fs.existsSync('pages')) {
        console.log('Remove "pages" folder');
        fs.removeSync('pages');
    }

    console.log('Create "pages" folder');
    fs.mkdirSync('pages');

    const globalStyles = configuration.Styles || [];

    Object.keys(configuration.Routes).forEach((routeKey) => {
        const routeConfig = configuration.Routes[routeKey];
        let routeFileName;
        if (routeConfig.Route === '/') {
            routeFileName = 'index'
        } else {
            routeFileName = routeConfig.Route.split('/')[1];
        }

        let widgetExecutions = [];
        let layoutVariables = {};
        let widgetImports = {};
        Object.keys(routeConfig.Containers).forEach((containerName) => {
            const widgets = routeConfig.Containers[containerName] || [];
            let divs = [];
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

generatePages();

fs.watch('layouts/', { recursive: true }, () => {
    generatePages();
});

fs.watchFile('compossibru.config.yml', () => {
    generatePages();
});

const child = spawn('npx', [
    'next'
]);

child.on('error', (err) => {
    throw err;
});

child.stdout.on('data', (data) => {
    process.stdout.write(data);
});

child.stderr.on('data', (data) => {
    process.stdout.write(data);
});

child.on('exit', () => {
    process.stdout.write('I\'m done!');
});

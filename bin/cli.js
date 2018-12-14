#!/usr/bin/env node

import path from 'path';
import fs from 'fs-extra';
import { v4 as uuid } from 'uuid';
import program from 'commander';
import cosmiconfig from 'cosmiconfig';

import { authors, name, version } from '../../package.json'; // eslint-disable-line
import { build, generatePages, start, watch } from '../src/compossibru'; // eslint-disable-line

const explorer = cosmiconfig('compossibru', { cache: false });
const getConfiguration = () => {
    const { config: configuration } = explorer.searchSync() || {};
    if (!configuration) {
        throw new Error('Cannot find configuration for compossibru');
    }
    return configuration;
};
const getFilepathToWatch = () => {
    const { filepath } = explorer.searchSync() || {};
    if (!filepath) {
        throw new Error('Cannot find configuration for compossibru');
    }
    return filepath;
};

const compossibru = () => {
    console.log(`${name} CLI (${version})`); // eslint-disable-line
};

const generatePagesProxy = (configuration) => {
    if (fs.existsSync('pages')) {
        fs.removeSync('pages');
    }
    fs.mkdirSync('pages');
    generatePages(
        configuration,
        `${path.dirname(__filename)}/../../src/compossibru-generate-pages`,
        'pages',
        () => `compossibru-${uuid()}`,
        process.cwd
    );
};

program
    .version(version)
    .description([
        `${name} CLI (${version})`,
        '',
        'Created with <3 by',
        authors.map(author => author.name).join(', ')
    ].join('\n'));

program
    .command('start')
    .description('Start application with dev server')
    .option('-p, --port [port]', 'Given port to run dev server', '3000')
    .option('-w, --watch [watch]', 'Watch files to re-generate pages', 'true')
    .action((options) => {
        compossibru();
        generatePagesProxy(getConfiguration());
        start(options.port);
        if (options.watch === 'true') {
            watch(getFilepathToWatch(), () => {
                generatePagesProxy(getConfiguration());
            });
        }
    });

program
    .command('build')
    .description('Build the application')
    .action(() => {
        compossibru();
        generatePagesProxy(getConfiguration());
        build();
    });

program.parse(process.argv);

if (program.args.length === 0) {
    program.help();
}

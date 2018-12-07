#!/usr/bin/env node

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
        generatePages(getConfiguration());
        start(options.port);
        if (options.watch === 'true') {
            watch(getFilepathToWatch(), () => {
                generatePages(getConfiguration());
            });
        }
    });

program
    .command('build')
    .description('Build the application')
    .action(() => {
        compossibru();
        generatePages(getConfiguration());
        build();
    });

program.parse(process.argv);

if (program.args.length === 0) {
    program.help();
}

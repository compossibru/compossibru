#!/usr/bin/env node

const program = require('commander');
const cosmiconfig = require('cosmiconfig');

const { authors, name, version } = require('../package.json');
const { build, generatePages, start, watch } = require('../src/compossibru'); // eslint-disable-line

const explorer = cosmiconfig('compossibru');
const getConfiguration = () => {
    const { config: configuration } = explorer.searchSync() || {};
    if (!configuration) {
        throw new Error('Cannot find configuration for compossibru');
    }
    return configuration;
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
            watch(() => {
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

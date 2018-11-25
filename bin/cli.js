#!/usr/bin/env node

const program = require('commander');
const { authors, name, version } = require('../package.json');
const { build, generatePages, start, watch } = require('../src/compossibru');

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
        generatePages();
        start(options.port);
        if (options.watch === 'true') {
            watch(generatePages);
        }
    });

program
    .command('build')
    .description('Build the application')
    .action(() => {
        generatePages();
        build();
    });

program.parse(process.argv);

if (program.args.length === 0) {
    program.help();
}

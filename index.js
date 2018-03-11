#!/usr/bin/env node

/**
 * shebang line for nix systems, npm will take care of making it work on windows
 */

const Operation = require('./src/Operation');
const program = require('commander');

program.version('1.1.2', '-v, --version');

program
    .command('run')
    .description('Run a specific tomcat.')
    .action(Operation.run);

program
    .command('add')
    .description('Configure a new tomcat.')
    .action(Operation.add);

program
    .command('rm')
    .description('Remove an available tomcat.')
    .action(Operation.rm);

program
    .command('list')
    .description('List all available tomcat.')
    .action(Operation.list);

program
    .command('*')
    .description('Catch all.')
    .action(() =>  program.help());

program.parse(process.argv);

if (program.args.length === 0) program.help()

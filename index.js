#!/usr/bin/env node

/**
 * shebang line for nix systems, npm will take care of making it work on windows
 */

const Operation = require('./src/Operation');
const program = require('commander');

program.version('1.3.0', '-v, --version');

program
    .command('run')
    .description('Run a specific tomcat.')
    .option('-l, --log [boolean]', 'Log complete output.')
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
    .command('open')
    .description('Open tomcat folder in file explorer.')
    .action(Operation.open);

program.parse(process.argv);

if (program.args.length === 0) program.help()

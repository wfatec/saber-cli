#!/usr/bin/env node
const program = require('commander');
const init = () => { console.log("hello saber!") }

/**
 * project init
 */
program
  .command('init')
  .description('project init')
  .action(() => {
    init();
  });
/**
 * create modules and pages
 */
program
  .command('create <paths...>')
  .description('create module‘s or page’s path')
  .action((paths) => {
    createTemplete(paths);
  });
/**
 * build progress
 */
program
  .command('build')
  .option('-m, --module [module]', 'Specified the build module')
  .option('-p, --page [page]', 'Specified the build page')
  .description('build the project')
  .action((options) => {
    process.env.NODE_ENV = 'production';
    const build = require('../lib/build/build');
    build(options.module, options.page);
  });
program.parse(process.argv);
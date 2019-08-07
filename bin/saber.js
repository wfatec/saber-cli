#!/usr/bin/env node
const program = require("commander");

// Notify update when process exits
const updater = require("update-notifier");
const pkg = require("../package.json");
const init = require("../lib/init");
updater({ pkg: pkg }).notify({ defer: true });

const printHelp = () => {
  console.log("  Commands:");
  console.log();
  console.log(
    "    init           Init a new saber application in the current folder"
  );
  console.log();
  console.log(
    "  All commands can be run with -h (or --help) for more information."
  );
}; 

// Version
program.version(pkg.version);

program
  .usage("<command> [options]")
  .on("--help", printHelp)
  .parse(process.argv);

/**
 * project init
 */
program
  .command("init")
  .description("project init")
  .action(() => {
    init();
  });
/**
 * create modules and pages
 */
program
  .command("create <paths...>")
  .description("create module‘s or page’s path")
  .action(paths => {
    createTemplete(paths);
  });
/**
 * build progress
 */
program
  .command("build")
  .option("-m, --module [module]", "Specified the build module")
  .option("-p, --page [page]", "Specified the build page")
  .description("build the project")
  .action(options => {
    process.env.NODE_ENV = "production";
    const build = require("../lib/build/build");
    build(options.module, options.page);
  });
program.parse(process.argv);

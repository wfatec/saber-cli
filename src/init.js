import { join, basename } from "path";
import vfs from "vinyl-fs";
import through from "through2";
import { renameSync } from "fs";
import chalk from "chalk";
import leftPad from "left-pad";
import inquirer from "inquirer";
import { sync as emptyDir } from "empty-dir";

const info = (type, message) => {
  console.log(`${chalk.green.bold(leftPad(type, 12))}  ${message}`);
};

const error = message => {
  console.error(chalk.red(message));
};

const success = message => {
  console.error(chalk.green(message));
};

const template = (dest, cwd) => {
  return through.obj(function(file, enc, cb) {
    if (!file.stat.isFile()) {
      return cb();
    }

    info("create", file.path.replace(cwd + "/", ""));
    this.push(file);
    cb();
  });
};

const init = ({ lib, install }) => {
  const type = lib === "react" ? "web-react" : "app";
  const cwd = join(__dirname, "../template", type);
  const dest = process.cwd();
  const projectName = basename(dest);

  if (!emptyDir(dest)) {
    error("Existing files here, please run init command in an empty folder!");
    process.exit(1);
  }

  console.log(`Creating a new Saber app in ${dest}.`);
  console.log();

  const printSuccess = () => {
    success(`
Success! Created ${projectName} at ${dest}.

Inside that directory, you can run several commands:
  * npm start: Starts the development server.
  * npm run build: Bundles the app into dist for production.
  * npm test: Run test.

We suggest that you begin by typing:
  cd ${dest}
  npm start

Happy hacking!`);
  };

  vfs
    .src(["**/*", "!node_modules/**/*"], { cwd: cwd, cwdbase: true, dot: true })
    .pipe(template(dest, cwd))
    .pipe(vfs.dest(dest))
    .on("end", function() {
      info("rename", "gitignore -> .gitignore");
      renameSync(join(dest, "gitignore"), join(dest, ".gitignore"));
      if (install) {
        // info("run", "npm install");
        // require("./install")(printSuccess);
      } else {
        printSuccess();
      }
    })
    .resume();
};

export default (...args) => {
  console.log();
  console.log(chalk.bold(chalk.green(`welcome to use saber-cli!`)));
  console.log();

  inquirer
    .prompt([
      {
        type: "confirm",
        name: "es6+",
        message: `Do you insist on using es6+?`,
        default: true
      },
      {
        type: "list",
        name: "lib",
        message: `Do you insist on using react?`,
        choices: ["react", "vue", "angular", "raw"],
        default: 0
      }
    ])
    .then(answer => {
      console.log("answer: ", answer);
      init(answer);
    })
    .catch(e => {
      console.error(chalk.red(`> Project init failed.`));
      console.error(e);
    });
};

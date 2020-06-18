#!/usr/bin/env node
const program = require("commander");
const inquirer = require("inquirer");
const ora = require("ora");
const shell = require("shelljs");
const hander = {
  init: (env) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "libray",
          message: "please choose js library",
          choices: ["react", "vue", "angular"],
        },
      ])
      .then((answers) => {
        const spinner = ora(`start ${answers} download `).start();
        if (!shell.which("git")) {
          shell.echo("Sorry, this script requires git");
          shell.exit(1);
        } else {
          shell.exec(
            "git clone git@git.dev.sh.ctripcorp.com:cc-frontend/zoom-miniapp.git"
          );
          spinner.stop();
        }
      });
  },
};

program.arguments("<cmd> [env]").action(function (cmd, env) {
  if (hander[cmd]) {
    hander[cmd](env);
  } else {
    console.log(`很抱歉，暂未实现该${cmd}命令`);
  }
});

// 处理参数入口
program.parse(process.argv);

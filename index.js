#!/usr/bin/env node
const shell = require('shelljs');
const fse = require('fs-extra');
const chalk = require('chalk');

const appName = process.argv[2];
const appDirectory = `${process.cwd()}/${appName}`;
const { log, error } = console;

const nextReduxApp = () =>
  new Promise((resolve, reject) => {
    if (appName) {
      shell.exec(`mkdir ${appName}`);
      shell.cd(`${appName}`);
      shell.exec('npm init -y');
      shell.exec('git init');
      resolve(true);
    } else {
      log('\nNo App name was provided.\n'.red);
      resolve(false);
    }
  });

const installPackages = () => {
  log(chalk.magenta('Installing dependencies...'));
  shell.exec(
    '\nnpm i react react-dom next @zeit/next-css @zeit/next-sass axios express next-redux-wrapper next-routes react-redux redux redux-devtools-extension redux-thunk styled-components\n'
  );
  log(chalk.blue('\nSetting Up ESLINT...'));
  shell.exec('npx install-peerdeps --dev eslint-config-wesbos\n');
};

const copyToProject = async () => {
  log(chalk.yellow('Almost Done...'));
  const path = __dirname;
  try {
    await fse.copy(`${path}/templates`, `${appDirectory}`);
    log(
      chalk.blue(`
    \n!Remember to add the following Scripts!\n
    "scripts": {
      "dev": "node ./server",
      "build": "next build",
      "start": "next start"
    }\n
  `)
    );
  } catch (err) {
    error(err);
  }
};

const run = async () => {
  const success = await nextReduxApp();
  if (!success) {
    log('Something when wrong while trying to create a new Next Redux App'.red);
    return false;
  }
  await installPackages();
  await copyToProject();
  log(chalk.green('\nProject Generated! Happy Hacking!'));
};

exports.run = run;

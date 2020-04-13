#!/usr/bin/env node

const fs = require('fs');
const { program } = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action(function (pathToFile2, pathToFile1) {
     const object1 = JSON.parse(fs.readFileSync(pathToFile1, 'utf8'));
     const object2 = JSON.parse(fs.readFileSync(pathToFile2, 'utf8'));
     console.log()
   })
  .parse(process.argv);

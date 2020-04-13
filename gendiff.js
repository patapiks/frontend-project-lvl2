#!/usr/bin/env node

const { program } = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action(function (firstConfig, secondConfig) {
    console.log('*???*')
  })
  .parse(process.argv);

console.log('Hello, World!');

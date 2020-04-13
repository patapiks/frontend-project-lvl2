#!/usr/bin/env node

const fs = require('fs');
const { program } = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action(function (firstConfig, secondConfig) {
    console.log(firstConfig, secondConfig)
  })
  .parse(process.argv);
/*
 .action(function (firstConfig, secondConfig) {
    fs.readFile(firstConfig, function (err, data) {
        if (err) {
           return console.error(err);
        }
        console.log("Asynchronous read: " + data.toString());
     });
  })
  */

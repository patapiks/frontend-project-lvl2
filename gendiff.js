#!/usr/bin/env node

const fs = require('fs');
const { program } = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action(function (pathToFile1, pathToFile2) {
     const result = [];
     const object1 = JSON.parse(fs.readFileSync(pathToFile1, 'utf8'));
     const object2 = JSON.parse(fs.readFileSync(pathToFile2, 'utf8'));
     for (key in object1) {
        if (object2.hasOwnProperty(key)) {
           object2[key] === object1[key] ? 
           1 + 1 : 
           result.push(` +${key}: ${object2[key]}`)
           result.push(`  ${key}: ${object1[key]}`)
        }
        if (!object2.hasOwnProperty(key)) result.push(` -${key}: ${object1[key]}`)
     }
     for (key in object2) {
        if (!object1.hasOwnProperty(key)) result.push(` +${key}: ${object2[key]}`)
     }
     console.log(`{\n${result.join('\n')}\n}`)
   })
  .parse(process.argv);

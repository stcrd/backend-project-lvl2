#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../src/index.js';
const { program } = commander;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows the difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2);
    console.log(result);
    return result;
  });
program.parse(process.argv);
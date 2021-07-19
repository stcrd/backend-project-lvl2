#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../src/generateDifference.js';
import formatSelector from '../src/formatters/index.js';

const { program } = commander;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows the difference.')
  .option('-f, --format [stylish, plain, json]', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2);
    const options = program.opts();
    const formatter = formatSelector(options.format);
    const result = formatter(diff);
    console.log(result);
    return result;
  });
program.parse(process.argv);

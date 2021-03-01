#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../src/generateDifference.js';
import stylish from '../src/stylish.js';

const { program } = commander;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows the difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2);
    const options = program.opts();
    const formater = options.format === 'stylish' ? stylish : () => 'unknown formatting';
    const result = formater(diff);
    console.log(result);
    return result;
  });
program.parse(process.argv);

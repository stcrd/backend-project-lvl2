import genDiff from './src/generateDifference.js';
import formatter from './src/formatters/index.js';

export default (filepath1, filepath2) => formatter(genDiff(filepath1, filepath2));

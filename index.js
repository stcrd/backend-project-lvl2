import genDiff from './src/generateDifference.js';
import defaultFormater from './src/formatters/default-formatter.js';

export default (filepath1, filepath2) => defaultFormater(genDiff(filepath1, filepath2));

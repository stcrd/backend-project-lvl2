import defaultFormatter from './default-formatter.js';
import stylish from './stylish.js';
import plain from './plain.js';

export default (format) => ({ defaultFormatter, stylish, plain }[format]);

import defaultFormatter from './default-formatter.js';
import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';

export default (format) => ({ defaultFormatter, stylishFormatter, plainFormatter }[format]);

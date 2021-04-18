import stylish from './stylish.js';
import plain from './plain.js';

export default (format) => ({ stylish, plain }[format]) ?? stylish;

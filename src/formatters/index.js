import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (format) => ({ stylish, plain, json }[format]) ?? stylish;

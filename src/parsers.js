import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filepath) => {
  const isJson = path.extname(filepath) === '.json';
  const rawData = fs.readFileSync(path.resolve(filepath));
  const parsedData = isJson ? JSON.parse(rawData) : yaml.load(rawData);
  return parsedData;
};

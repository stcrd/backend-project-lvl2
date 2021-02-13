import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filepath1, filepath2) => {
  const isJson = path.extname(filepath1) === '.json';
  const rawData1 = fs.readFileSync(path.resolve(filepath1));
  const rawData2 = fs.readFileSync(path.resolve(filepath2));
  const parsedData1 = isJson ? JSON.parse(rawData1) : yaml.load(rawData1);
  const parsedData2 = isJson ? JSON.parse(rawData2) : yaml.load(rawData2);

  return { parsedData1, parsedData2 };
};

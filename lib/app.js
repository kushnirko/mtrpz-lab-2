import handleArgs from './handleArgs.js';
import { read, write } from './fsWrapper.js';
import validateMd from './validateMd.js';
import convertMd from './md-converting/convertMd.js';

try {
  const { inputPath, outputPath, format } = handleArgs();
  const md = read(inputPath);
  validateMd(md);
  const res = convertMd(md, format);
  if (outputPath) write(outputPath, res, format);
  else console.log(res);
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}

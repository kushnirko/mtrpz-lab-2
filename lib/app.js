const { readFile, writeFile } = require('node:fs');

const validate = require('./md-validator.js');
const convert = require('./md-to-html-converter.js');

const fail = (message) => {
  console.error(`Error: ${message}`);
  process.exit(1);
};

const args = process.argv.slice(2);
if (args.length > 3) fail('too many arguments');
const [inputPath, outOption, outputPath] = args;
if (!inputPath) {
  fail('no input file path provided');
} else if (outOption) {
  if (outOption === '--out') {
    if (!outputPath) fail('no output file path provided');
  } else {
    fail(`invalid argument ${outOption}`);
  }
}

readFile(inputPath, 'utf-8', (readErr, data) => {
  if (readErr) {
    fail(`cannot read the file ${inputPath} (${readErr.message})`);
  }
  const validateErr = validate(data);
  if (validateErr) fail(validateErr.message);
  const result = convert(data);
  if (outputPath) {
    writeFile(outputPath, result, (writeErr) => {
      if (writeErr) {
        fail(`cannot write to the file ${outputPath} (${writeErr.message})`);
      }
    });
  } else {
    console.log(result);
  }
});

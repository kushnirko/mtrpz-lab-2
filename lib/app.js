const { readFile, writeFile } = require('node:fs');

try {
  const args = process.argv.slice(2);
  if (args.length > 3) throw new Error('too many arguments');
  const [inputPath, outOption, outputPath] = args;
  if (!inputPath) {
    throw new Error('no input file path provided');
  } else if (outOption) {
    if (outOption === '--out') {
      if (!outputPath) throw new Error('no output file path provided');
    } else {
      throw new Error(`invalid argument ${outOption}`);
    }
  }

  readFile(inputPath, 'utf-8', (readErr, data) => {
    if (readErr) {
      throw new Error(`cannot read the file ${inputPath} (${readErr.message})`);
    }

    // TODO: Markdown markup validation
    // TODO: Markdown to HTML converting

    if (outputPath) {
      writeFile(outputPath, data, (writeErr) => {
        if (writeErr) {
          throw new Error(
            `cannot write to the file ${outputPath} (${writeErr.message})`,
          );
        }
      });
    } else {
      console.log(data);
    }
  });
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}

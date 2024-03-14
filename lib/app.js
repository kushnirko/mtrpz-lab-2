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
  console.log('Success!');
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}

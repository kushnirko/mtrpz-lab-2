export default function handleArgs() {
  const [inputPath, ...args] = process.argv.slice(2);
  let outputPath;
  let format = 'ansi'; // default format for output to console

  if (!inputPath) throw new Error('no input file path provided');

  const outFlagIndex = args.indexOf('--out');
  if (outFlagIndex !== -1) {
    format = 'html'; // default format for output to file
    [, outputPath] = args.splice(outFlagIndex, 2);
    if (!outputPath) throw new Error('no output path provided');
  }

  const formatFlagIndex = args.findIndex((arg) => arg.startsWith('--format='));
  if (formatFlagIndex !== -1) {
    [, format] = args.splice(formatFlagIndex, 1)[0].split('=');
  }

  if (args.length > 0) throw new Error(`invalid argument - ${args[0]}`);

  return { inputPath, outputPath, format };
}

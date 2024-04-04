# Simplified Markdown converter

**This command-line tool takes as input a path to a text file containing simplified Markdown markup and converts it to HTML tags or ANSI escape sequences.**

The resulting data is either printed to [standard output](https://en.wikipedia.org/wiki/Standard_streams) (stdout) or written to the output file if the path to it is specified using the `--out` flag.

Output to the console is by default in ANSI escape sequences format, but if an output file path is specified, the converter will use HTML format. However, you can manually set the required format using the `--format=value` flag.

The tool also validates Markdown markup for correctness. If errors are encountered, it prints the appropriate message to [standard error](https://en.wikipedia.org/wiki/Standard_streams) (stderr) and exits with a non-zero status code.

## Prerequisites

To use this tool, you must have [Node.js](https://nodejs.org/en) installed on your system.

> [!NOTE]
> You can install the current long-term support version of Node.js on the platform's official [download page](https://nodejs.org/en/download)

## Installation

Clone this repository to the desired location on your system:

```bash
git clone --depth 1 https://github.com/kushnirko/mtrpz-lab-2.git /path/to/desired/location/
```

> [!NOTE]
> Alternatively, you can download the source code archive of the latest release

## Usage

1. Navigate to the directory where the repository was cloned (or where the source code was placed):

```bash
cd /path/to/converter/location/
```

2. Go to the `lib/` directory:

```bash
cd lib/
```

3. Run the following command:

```bash
node app.js /path/to/input.{md,txt} [--out /path/to/output.{txt,html}] [--format={ansi,html}]
```

## Example

_This example shows exactly how the tool converts Markdown markup_

### Input:

<pre>
```
Лабці з _МТРПЗ_ присвячується:
```
Якщо зараз **совість тебе гризе**,
сядь і зроби лабку з `МТРПЗ`!

_В дружбі чи в коханні_ може не везе?
Сядь і зроби **лабку з МТРПЗ!**

```
Від **злості чи від страху** тебе трясе?

Сядь і зроби лабку з `МТРПЗ!`
```

Ніщо _більшого_щастя_ тобі не принесе,
_`_ ніж `виконана лабка з МТРПЗ`! `_`
</pre>

### Output for HTML format:

```html
<p>
<pre>
Лабці з _МТРПЗ_ присвячується:
</pre>
Якщо зараз <b>совість тебе гризе</b>,
сядь і зроби лабку з <tt>МТРПЗ</tt>!</p>
<p><i>В дружбі чи в коханні</i> може не везе?
Сядь і зроби <b>лабку з МТРПЗ!</b></p>
<p>
<pre>
Від **злості чи від страху** тебе трясе?

Сядь і зроби лабку з `МТРПЗ!`
</pre>
</p>
<p>Ніщо <i>більшого_щастя</i> тобі не принесе,
<i>`</i> ніж <tt>виконана лабка з МТРПЗ</tt>! <tt>_</tt></p>
```

### Output for ANSI escape sequences format

![output-ansi](https://github.com/kushnirko/mtrpz-lab-2/assets/115948037/7bd1b3e3-288a-403d-b0c1-eb46595b3dd7)

## Testing

There are **49** unit tests (located in the `test/` directory) written using the [Jest testing framework](https://jestjs.io). \
To run them, install the necessary Jest packages and then use the appropriate npm script:

```bash
npm install jest @jest/globals
```

```bash
npm run test
```

## Conclusion

Using unit tests helped me save a lot of time when modifying the application. I added new functionality and immediately covered it with tests. Thus, it was no longer necessary to write temporary stubs to fully implement the system to see if a particular module works correctly. \
I also noticed that writing the tests once and then running them with one command is much nicer than having to check everything manually every time 🙃.

## Links

### [Revert commit](https://github.com/kushnirko/mtrpz-lab-2/commit/158f8c555173593e06cc947b5985a66dbacfe514)

### [Commit with failed tests](https://github.com/kushnirko/mtrpz-lab-2/commit/0b727832a48600496eb77a0fe5d5db486c2e1cdb)

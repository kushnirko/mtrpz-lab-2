# Simplified Markdown to HTML converter

**This command-line tool takes as input a path to a text file containing simplified Markdown markup and converts it to a fragment of HTML.**

The resulting HTML markup is either printed to [standard output](https://en.wikipedia.org/wiki/Standard_streams) (stdout) or written to the output file if the path to it is specified using the `--out` flag.

The tool also validates Markdown markup for correctness. If errors are encountered, it prints the appropriate message to [standard error](https://en.wikipedia.org/wiki/Standard_streams) (stderr) and exits with a non-zero status code.

## Prerequisites

To use this tool, you must have [Node.js](https://nodejs.org/en) installed on your system.

> [!NOTE] 
> You can install the current long-term support version of Node.js on the platform's official [download page](https://nodejs.org/en/download)

## Installation

Clone this repository to the desired location on your system:
```bash
git clone --depth 1 https://github.com/kushnirko/mtrpz-lab-1.git /path/to/desired/location/ 
```

## Usage

1. Navigate to the directory where the repository was cloned:
```bash
cd /path/to/repository/
```

2. Go to the `lib/` directory:
```bash
cd lib/
```

3. Run one of the following commands (you can use **_*.md_** or **_*.txt_** as input files):
```bash
node app.js /path/to/input.md
```
```bash
node app.js /path/to/input.txt --out /path/to/output.html
```

## Example

_This example shows exactly how the tool converts Markdown markup to HTML_

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

### Output:

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

## Links

### [Revert commit](https://github.com/kushnirko/mtrpz-lab-1/commit/5a9332f863f6fbc53a02b869185d9409dee94b7c)

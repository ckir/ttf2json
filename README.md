# ttf2json
A procedure to convert ttf/otf fonts to json format for use by libraries like blessed

# How to use it
1. clone this repo
2. put your ttf fonts into fonts_ttf folder (or/and your otf fonts into fonts_otf folder)
3. run the 0_runall.sh script

You will find your converted fonts into fonts_json folder

# Prerequisites
1. node.js
2. fontforge (sudo apt-get install fontforge)

# How it works
1. Converts all ttf fonts in fonts_ttf folder to otf format via fontforge. Output goes to fonts_otf folder.
2. Converts all otf fonts in fonts_otf folder to bdf format via otf2bdf tool. A pre compiled binary provided here for convinience. Output goes to fonts_bdf folder.
3. Converts all bdf fonts in fonts_bdf folder to json format via [Pxxl.js](https://github.com/remcoder/Pxxl.js) tool.

# ttf2json
A procedure to convert ttf/otf fonts to json format for use by libraries like blessed

# Why you might want to convert a ttf/otf font to json format
You need fonts in json format in case you are writing tuis for blessed neo-blessed reblessed etc libraries and you are not happy with the standard terminus font for your BigText widgets.

# How to use it
1. clone this repo
2. put your ttf fonts into fonts_ttf folder (or/and your otf fonts into fonts_otf folder)
3. run the 0_runall.sh script

You will find your converted fonts into fonts_json folder

# Prerequisites
1. node.js
2. fontforge (sudo apt-get install fontforge)

# How it works
1. Converts all ttf fonts in fonts_ttf folder to otf format via [fontforge](https://fontforge.org/en-US/). Output goes to fonts_otf folder.
2. Converts all otf fonts in fonts_otf folder to bdf format via [otf2bdf](https://github.com/jirutka/otf2bdf) tool. A pre compiled binary provided here for convinience. Output goes to fonts_bdf folder.
3. Converts all bdf fonts in fonts_bdf folder to json format via [Pxxl.js](https://github.com/remcoder/Pxxl.js) tool.

# Notes
Most of the tools used here seems to be abadoned in nowadays. Especially the Pxxl.js fails miserably in most cases and therefore only a small number of conversions succeeds. However, something is better than nothing. Any suggestions for improvements wellcome.
You might want to have a look [here](https://github.com/chjj/ttystudio#choosing-a-new-font-for-your-terminal-recording), [here](https://github.com/SametSisartenep/sys-utils/blob/master/ttf2otf-global) and [here](https://github.com/AlexLakatos/ascii-themes)

Enjoy

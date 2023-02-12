import { URL, fileURLToPath } from 'node:url';
import path from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = fileURLToPath(new URL('.', import.meta.url));

import fs from 'node:fs';
import util from 'node:util';

import pxxl from './pxxl.mjs'

var files = process.argv.slice(2);

var silent = false;
if (files[0] === '--silent') {
  silent = true;
  files.shift();
}

function compileFont(file) {

  const jsonFile = path.join(__dirname, 'fonts_json', path.basename(file, '.bdf') + '.json')
  const data = fs.readFileSync(file, 'utf8');

  var result = pxxl.sync(data, 'ab')
    , pixels = result[0]
    , font = result[1];

  var width = 0
    , height = 0;

  if (!silent) {
    console.log(util.inspect(font, {
      depth: 20,
      colors: true
    }));
    console.log('');
  }

  var glyphs = Object.keys(font.glyphs).reduce(function (glyphs, code) {
    var ch = String.fromCharCode(+code);
    var result = pxxl.sync(data, ch);
    var pixels = result[0];
    glyphs[ch] = {
      code: +code,
      ch: ch,
      pixels: pixels
    };
    return glyphs;
  }, {});

  Object.keys(glyphs).forEach(function (ch) {
    for (var p = 0; p < glyphs[ch].pixels.length; p++) {
      var pixel = glyphs[ch].pixels[p]
        , x = pixel.x
        , y = pixel.y;

      for (var yi = y; yi < y + 1; yi++) {
        for (var xi = x; xi < x + 1; xi++) {
          width = Math.max(width, x + 1);
          height = Math.max(height, y + 1);
        }
      }
    }
  });

  Object.keys(glyphs).forEach(function (ch) {
    var lines = [];
    for (var y = 0; y < height; y++) {
      var line = [];
      for (var x = 0; x < width; x++) {
        line.push(' ');
      }
      lines.push(line);
    }

    for (var p = 0; p < glyphs[ch].pixels.length; p++) {
      var pixel = glyphs[ch].pixels[p]
        , x = pixel.x
        , y = pixel.y;

      for (var yi = y; yi < y + 1; yi++) {
        for (var xi = x; xi < x + 1; xi++) {
          if (!lines[yi][xi]) {
            throw new Error;
          }
          lines[yi][xi] = '-';
        }
      }
    }

    glyphs[ch].map = lines.map(function (line) {
      return line.join('');
    });

    lines = lines.reduce(function (out, line) {
      return out + line.join('') + '\n';
    }, '');

    if (ch === 'M') {
      if (!silent) {
        console.log(lines);
        console.log([width, height]);
      }
    }
  });

  var minGlyphs = Object.keys(glyphs).reduce(function (out, ch) {
    var glyph = glyphs[ch];
    out[ch] = {
      ch: glyph.ch,
      code: glyph.code,
      map: glyph.map
    };
    return out;
  }, {});

  var out = {
    // font: {
    //   info: font,
    //   glyphs: glpyhs
    // },
    width: width,
    height: height,
    glyphs: minGlyphs
  };

  fs.writeFileSync(jsonFile, JSON.stringify(out, null, 2));
}

const bdfdir = path.join(__dirname, "fonts_bdf")
fs.readdirSync(bdfdir).forEach(function (file) {
  if (/\.bdf$/.test(file)) {
    try {
      console.log(`Compiling [${file}] ...`)
      compileFont(path.join(bdfdir, file));
    } catch (error) {
      console.error(`ERROR compiling [${file}]:`, error.message)
    }
  }
});


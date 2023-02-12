#!/usr/bin/env bash

if [[ ! -x "$(which fontforge)" ]]; then
    echo "Fontforge not found. Aborting."
    exit 1
fi

cd fonts_otf
dir="fonts_ttf"
for f in ../fonts_ttf/*.ttf; do
    bn=$(basename $f .ttf)
    otfFont="$bn.otf"
    ttfFont="../fonts_ttf/$bn.ttf"
    figlet $bn

    fontforge -c '
import fontforge
font = fontforge.open("'$ttfFont'")
font.generate("'$otfFont'")
'
done

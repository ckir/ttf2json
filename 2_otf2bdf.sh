#!/usr/bin/env bash

for f in fonts_otf/*.otf; do
  bn=`basename $f .otf`
  echo $f
  ./otf2bdf "$f" > "fonts_bdf/$bn.bdf"
done
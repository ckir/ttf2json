#!/usr/bin/env bash
if [[ ! -x "$(which fontforge)" ]]; then
    echo "Node.js not found. Aborting."
    exit 1
fi

node compile.mjs
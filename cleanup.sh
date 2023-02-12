#!/bin/bash

# Ensure we are running under bash
if [ "$BASH_SOURCE" = "" ]; then
    /bin/bash "$0"
    exit 0
fi

#
# Load bash-menu script
#
# NOTE: Ensure this is done before using
#       or overriding menu functions/variables.
#
. "./lib/bash-menu.sh"


################################
## Menu Actions
##
## They should return 1 to indicate that the menu
## should continue, or return 0 to signify the menu
## should exit.
################################
actionA() {
    echo "Cleaned fonts_ttf"
    rm ./fonts_ttf/*

    echo -n "Press enter to continue ... "
    read response

    return 1
}

actionB() {
    echo "Cleaned fonts_otf"
    rm ./fonts_otf/*
    echo -n "Press enter to continue ... "
    read response

    return 1
}

actionC() {
    echo "Cleaned fonts_bdf"
    rm ./fonts_bdf/*
    echo -n "Press enter to continue ... "
    read response

    return 1
}

actionD() {
    echo "Cleaned fonts_json"
    rm ./fonts_json/*
    echo -n "Press enter to continue ... "
    read response

    return 1
}

actionE() {
    echo "Cleaned everything"
    rm ./fonts_ttf/* ./fonts_otf/* ./fonts_bdf/* ./fonts_json/*
    echo -n "Press enter to continue ... "
    read response

    return 1
}

actionX() {
    return 0
}


################################
## Setup Example Menu
################################

## Menu Item Text
##
## It makes sense to have "Exit" as the last item,
## as pressing Esc will jump to last item (and
## pressing Esc while on last item will perform the
## associated action).
##
## NOTE: If these are not all the same width
##       the menu highlight will look wonky
menuItems=(
    "1. Clear fonts_ttf "
    "2. Clean fonts_otf "
    "3. Clean fonts_bdf "
    "4. Clean fonts_json"
    "A. Clean All       "
    "Q. Exit            "
)

## Menu Item Actions
menuActions=(
    actionA
    actionB
    actionC
    actionD
    actionE
    actionX
)

## Override some menu defaults
menuTitle=" Cleanup Menu"
menuFooter=" Enter=Select, Navigate via Up/Down/First number/letter"
menuWidth=60
menuLeft=25
# menuColour=$DRAW_COL_RED
# menuHighlight=$DRAW_COL_RED


################################
## Run Menu
################################
menuInit
menuLoop


exit 0

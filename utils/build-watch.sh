#!/usr/bin/env bash
SCRIPT_ROOT=$(cd $(dirname $0); pwd)
cd $SCRIPT_ROOT/..

npx ottoia clean && npx tsc -v && npx tsc -b -w \
    packages/library \
    packages/tests/* \
    packages/examples/*

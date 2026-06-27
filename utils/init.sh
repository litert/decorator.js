#!/usr/bin/env bash
SCRIPT_ROOT=$(cd $(dirname $0); pwd)

npx husky
npx ottoia bootstrap -N

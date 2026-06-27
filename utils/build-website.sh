#!/usr/bin/env bash
set -euo pipefail

SCRIPT_ROOT=$(cd "$(dirname "$0")"; pwd)

cd "$SCRIPT_ROOT/.."

GITHUB_REPO_URL=$(node -p "require('./package.json').repository.url.replace(/^git\\+/, '').replace(/\\.git$/, '')")
GITHUB_BRANCH=master
export GITHUB_SOURCE_BASE="${GITHUB_REPO_URL}/blob/${GITHUB_BRANCH}"

rm -rf docs/website/en
cp -R docs/en docs/website/en

find docs/website/en -name "*.md" -exec sed -e 's/\[TOC\]//g' -i {} \;

node --input-type=module <<'NODE'
import fs from 'node:fs';
import path from 'node:path';

const sourceBase = process.env.GITHUB_SOURCE_BASE;

function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const file = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(file);
        }
        else if (entry.isFile() && entry.name.endsWith('.md')) {
            let text = fs.readFileSync(file, 'utf8');
            text = text.replace(/\]\((?:\.\.\/)+packages\/library\/src\/([^)#]+)(#[^)]+)?\)/g, (_, src, hash = '') => {
                return `](${sourceBase}/packages/library/src/${src}${hash})`;
            });
            text = text.replace(/\]\((?:\.\.\/)+packages\/examples\/([^)#]+)(#[^)]+)?\)/g, (_, src, hash = '') => {
                return `](${sourceBase}/packages/examples/${src}${hash})`;
            });
            text = text.replace(/\]\((?:\.\.\/)+packages\/library\/package\.json\)/g, `](${sourceBase}/packages/library/package.json)`);
            fs.writeFileSync(file, text);
        }
    }
}

walk('docs/website/en');

const readmes = [];
function collectReadmes(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const file = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            collectReadmes(file);
        }
        else if (entry.isFile() && entry.name === 'README.md') {
            readmes.push(file);
        }
    }
}

collectReadmes('docs/website/en');

for (const file of readmes.sort((a, b) => b.length - a.length)) {
    fs.renameSync(file, path.join(path.dirname(file), 'index.md'));
}

walk('docs/website/en');
NODE

find docs/website/en -name "*.md" -exec sed -e 's/README.md/index.md/g' -i {} \;

rm -f docs/website/.vitepress/html-docs.tgz

cleanup() {
    npm un -D vitepress --package-lock=false --ignore-scripts >/dev/null 2>&1 || true
}

npm i -D vitepress --package-lock=false --ignore-scripts >/dev/null
trap cleanup EXIT

npx vitepress build docs/website
cleanup
trap - EXIT

cd "$SCRIPT_ROOT/../docs/website/.vitepress/dist"
tar -zcf ../html-docs.tgz ./*

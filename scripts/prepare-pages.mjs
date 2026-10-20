import { copyFile, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { build } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
// Pre-render every route: text and real links work even if JavaScript cannot run.
const base = '/baudroieLP_shomei/';
await build({base, build:{ssr:'src/main.tsx', outDir:'.pages-ssr', copyPublicDir:false}});
const { App } = await import(pathToFileURL(path.resolve('.pages-ssr/main.js')).href);
const template = await readFile('dist/index.html','utf8');
const titles = { '':'ボードルアで働くということ。', sales:'営業', hr:'人事・採用', engineer:'エンジニア' };
for (const role of ['', 'sales', 'hr', 'engineer']) {
  const content = renderToString(React.createElement(App, {path:'/' + role}));
  const html = template.replace('<div id="root"></div>', `<div id="root">${content}</div>`)
    .replace(/<title>.*?<\/title>/s, `<title>${titles[role]} | baudroie inc.</title>`);
  await mkdir(`dist/${role}`, {recursive:true});
  await writeFile(`dist/${role ? role + '/' : ''}index.html`, html);
  await mkdir(`dist/no-js/${role}`, {recursive:true});
  await writeFile(`dist/no-js/${role ? role + '/' : ''}index.html`, html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,''));
}
await rm('.pages-ssr', {recursive:true, force:true});
await copyFile('dist/index.html', 'dist/404.html');
await writeFile('dist/.nojekyll', '');
await writeFile('dist/deployment.json', JSON.stringify({
  source_commit: process.env.SOURCE_COMMIT || execFileSync('git', ['rev-parse', 'HEAD'], {encoding:'utf8'}).trim(),
  base, built_at: new Date().toISOString(),
}, null, 2) + '\n');

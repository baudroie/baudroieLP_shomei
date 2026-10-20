import { build } from 'vite';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';

// Local preview only. No deploy, publish, push, or merge commands.
await build({ build: { outDir: 'preview-dist' } });
await build({ build: { ssr: 'src/main.tsx', outDir: '.engineer-ssr', copyPublicDir: false } });
try {
  const { App } = await import(pathToFileURL(path.resolve('.engineer-ssr/main.js')).href);
  const html = await readFile('preview-dist/index.html', 'utf8');
  const content = renderToString(React.createElement(App, { path: '/engineer' }));
  const page = html.replace('<div id="root"></div>', `<div id="root">${content}</div>`)
    .replace(/<title>.*?<\/title>/s, '<title>エンジニア | baudroie inc.</title>');
  await mkdir('preview-dist/engineer', { recursive: true });
  await writeFile('preview-dist/engineer/index.html', page);
  // A script-free copy makes the progressive enhancement fallback directly reviewable.
  await mkdir('preview-dist/qa-no-js', { recursive: true });
  await writeFile('preview-dist/qa-no-js/index.html', page.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ''));
  console.log('Engineer HTML prerendered. Preview: /engineer/; script-free check: /qa-no-js/');
} finally {
  await rm('.engineer-ssr', { recursive: true, force: true });
}
